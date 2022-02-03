import React, { Dispatch, SetStateAction, useContext, useEffect, useState, VFC } from "react";
import { Toggle } from "@supabase/ui";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "../libs/supabase";
import { Theme } from "../pages/_app";

export type theme = {
  isDarkMode: boolean,
  setIsDarkMode: Dispatch<SetStateAction<boolean>>
  toggleDarkMode: () => void
}

export const Header: VFC = () => {
  const user = supabase.auth.user()
  const { isDarkMode, setIsDarkMode, toggleDarkMode } = useContext<theme>(Theme);

  useEffect(() => {
    const themeMode = async () => {
      if (isDarkMode) {
        document.body.classList.add("dark");
        console.log("========trueだよ==========");
        console.log(isDarkMode);
        // await supabase.from("user").update({ isDarkMode: isDarkMode }).eq("user_id", user.id);
      } else {
        document.body.classList.remove("dark");
        console.log("========falseだよ==========");
        // await supabase.from("user").update({ isDarkMode: isDarkMode }).eq("user_id", user.id);
      }
    }
    themeMode();
  }, [toggleDarkMode]);

  return (
    <header className="flex justify-between gap-4 text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center p-4 md:px-12 lg:px-18">
      <Link href="/">
        <a>
          <Image
            src="/kai-mono__1_-removebg-preview.png"
            alt="logo"
            width={80}
            height={80}
          />
        </a>
      </Link>
      <Link href="/">
        <a className="text-3xl md:text-5xl lg:text-6xl text-center">
          <h1 className="font-PottaOne">kai-mono</h1>
        </a>
      </Link>
      <Toggle className="mr-4" onChange={toggleDarkMode} checked={isDarkMode} />
    </header>
  );
};
