import React, { useEffect, useState, VFC } from "react";
import { Button, Divider, Dropdown, IconClipboard, IconLogOut, IconMail, IconSettings, IconUsers, Typography } from "@supabase/ui";

import { supabase } from "../libs/supabase";
import { useRouter } from "next/dist/client/router";

const THIS_YEAR = new Date().getFullYear();

export const Footer: VFC = () => {
  const router = useRouter();
  const user = supabase.auth.user();

  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center justify-between h-12">
      <small lang="en" className="ml-2">
        &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
      </small>
      <Dropdown
        overlay={[
          <Dropdown.Item
            onClick={() => router.push("/history")}
            icon={<IconClipboard />}
          >
            <Typography.Text>過去の買い物リスト</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item icon={<IconMail />}>
            <Typography.Text>招待する</Typography.Text>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item
            icon={<IconLogOut />}
            onClick={() => {
              supabase.auth.signOut();
              router.replace("/");
            }}
          >
            ログアウト
          </Dropdown.Item>
        ]}
      >
        <Button block size="medium"><IconSettings /></Button>
      </Dropdown>

    </footer>
  );
};
