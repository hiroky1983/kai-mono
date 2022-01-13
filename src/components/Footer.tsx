import React, { VFC } from "react";
import { Button, IconLogOut } from "@supabase/ui";

import { supabase } from "../libs/supabase";

export const Footer: VFC = () => {
  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center">
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
