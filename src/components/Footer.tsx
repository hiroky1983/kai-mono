import React, { VFC } from "react";
import { Button, Divider, Dropdown, IconClipboard, IconLogOut, IconMail, IconUsers, Typography } from "@supabase/ui";

import { supabase } from "../libs/supabase";
import { useRouter } from "next/dist/client/router";

const THIS_YEAR = new Date().getFullYear();

export const Footer: VFC = () => {
  const router = useRouter();
  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center gap-4">
      <Dropdown
        overlay={[
          <Dropdown.Item
            onClick={() => router.push("/history")}
            icon={<IconClipboard />}
          >
            <Typography.Text>過去の買い物リスト</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item icon={<IconMail />}>
            <Typography.Text>Duplicate</Typography.Text>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item
            icon={<IconLogOut />}
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </Dropdown.Item>
        ]}
      >
        <Button block><IconUsers /></Button>
      </Dropdown>

      <small lang="en">
        &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
      </small>
    </footer>
  );
};
