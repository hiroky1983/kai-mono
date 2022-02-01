import { AppProps } from 'next/dist/shared/lib/router/router'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { theme } from '../components/Header';
import { supabase } from '../libs/supabase';

let isDarkMode: boolean;
let setIsDarkMode: Dispatch<SetStateAction<boolean>>;
let toggleDarkMode: () => void;

export const Theme = createContext<theme>({ isDarkMode, setIsDarkMode, toggleDarkMode });

function MyApp({ Component, pageProps }: AppProps) {
  const user = supabase.auth.user()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const initdata = async () => {
    if (user) {
      const userData = await supabase.from("user").select();
      const data = userData.data.find((d) => {
        return d.user_id === user.id
      })
      setIsDarkMode(data.isDarkMode)
    }
  }
  useEffect(() => {
    initdata()
  }, [])

  return (
    <Theme.Provider value={{ isDarkMode, setIsDarkMode, toggleDarkMode }} >
      <Component {...pageProps} />
    </Theme.Provider>
  )
}

export default MyApp
