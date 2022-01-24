import React, { VFC } from "react";
import { Button, IconLogOut } from "@supabase/ui";

import { supabase } from "../libs/supabase";

const THIS_YEAR = new Date().getFullYear();

export const Footer: VFC = () => {
  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center gap-1">
      <Button
        size="medium"
        icon={<IconLogOut />}
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </Button>
      <small className="block" lang="en">
        &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
      </small>
    </footer>
  );
};
