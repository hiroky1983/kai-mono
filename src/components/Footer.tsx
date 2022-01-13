import React, { VFC } from "react";
import { Button, IconLogOut, Toggle } from "@supabase/ui";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "../libs/supabase";

export const Footer: VFC = () => {
  return (
    <footer className="flex text-gray-600 bg-gray-200 items-center">
      <Button
        size="medium"
        icon={<IconLogOut />}
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </Button>
    </footer>
  );
};
