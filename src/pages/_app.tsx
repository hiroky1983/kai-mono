import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { AppProps } from "next/dist/shared/lib/router/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "tailwindcss/tailwind.css";
import { theme } from "../components/Header";
import { supabase } from "../libs/supabase";

let isDarkMode;
let setIsDarkMode;
let toggleDarkMode;

export const Theme = createContext<theme>({
  isDarkMode,
  setIsDarkMode,
  toggleDarkMode,
});

const darkMode = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};
function MyApp({ Component, pageProps }: AppProps) {
  const user = supabase.auth.user();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async () => {
    darkMode(!isDarkMode);
    await supabase
      .from("user")
      .update({ isDarkMode: !isDarkMode })
      .eq("user_id", user.id);
    setIsDarkMode(!isDarkMode);
  };

  const initdata = async () => {
    const { data: userData } = await supabase.from("user").select("*");
    const data = userData.find((d) => {
      return d.user_id === user.id;
    });
    setIsDarkMode(data.isDarkMode);
    if (data.isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  useEffect(() => {
    if (user) {
      initdata();
    }
  }, []);

  return (
    <ChakraProvider >
      <Theme.Provider value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}>
        <Component {...pageProps} />
      </Theme.Provider>
    </ChakraProvider>
  )
}
export default MyApp;
