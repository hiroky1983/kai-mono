import React, {
  Dispatch,
  SetStateAction,
  useContext,
  VFC,
} from "react";
import { Toggle } from "@supabase/ui";
import Link from "next/link";
import Image from "next/image";
import { Theme } from "../pages/_app";

export type theme = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
};

export const Header: VFC = () => {
  const { isDarkMode, toggleDarkMode } =
    useContext<theme>(Theme);

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
