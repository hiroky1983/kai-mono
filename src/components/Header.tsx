import React, { useEffect, useState, VFC } from "react";
import { Toggle } from "@supabase/ui";

import Link from "next/link";
import Image from "next/image";

export const Header: VFC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="flex justify-between gap-4 text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center">
      <Link href="/">
        <a>
          <Image
            src="/kai-mono__1_-removebg-preview.png"
            alt="logo"
            width={120}
            height={120}
          />
        </a>
      </Link>
      <Link href="/">
        <a className="text-4xl text-center">
          <h1>kai-mono</h1>
        </a>
      </Link>
      <Toggle className="mr-4" onChange={toggleDarkMode} />
    </header>
  );
};
