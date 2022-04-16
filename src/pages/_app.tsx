import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/dist/shared/lib/router/router";
import { createContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { supabase } from "../libs/supabase";
import type { ThemeType } from "../libs/type";

let isDarkMode;
let setIsDarkMode;
let toggleDarkMode;

export const Theme = createContext<ThemeType>({
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
  }, [user]);

  return (
    <ChakraProvider>
      <Theme.Provider value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}>
        <Component {...pageProps} />
      </Theme.Provider>
    </ChakraProvider>
  );
}
export default MyApp;
