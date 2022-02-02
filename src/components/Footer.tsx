import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import {
  Button,
  Divider,
  Dropdown,
  IconClipboard,
  IconLogOut,
  IconMail,
  IconSettings,
  Input,
  Modal,
  Typography,
} from "@supabase/ui";
import { supabase } from "../libs/supabase";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";


const THIS_YEAR = new Date().getFullYear();

export const Footer: VFC = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const userData = async () => {
    const user = await supabase.from("user").select();
    const data = user.data;
    const authUser = supabase.auth.user();
    if (authUser) {
      const returnData = data.find((d) => {
        return d.user_id === authUser.id;
      })
      setUserName(returnData.user_name);
    }
  }

  useEffect(() => {
    userData();
  }, [])

  const onChangeEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => setEmail(e.target.value), [email]);

  const toggle = async () => {
    setVisible(!visible);
    await supabase.from("user").update({ isDarkMode: visible })
  };

  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center justify-between h-12">
      <small lang="en" className="ml-2">
        &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
      </small>
      <Dropdown
        overlay={[
          <Dropdown.Item>
            <Typography.Text>{userName}</Typography.Text>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item
            onClick={() => router.push("/history")}
            icon={<IconClipboard />}
          >
            <Typography.Text>過去の買い物リスト</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item icon={<IconMail />} onClick={toggle}>
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
        <Button block size="medium">
          <IconSettings />
        </Button>
      </Dropdown>
      <Modal
        closable
        confirmText="送信"
        cancelText="キャンセル"
        title="招待メールを送る"
        description="招待メールを送ると、招待された人はこのアプリを使用することができます。"
        visible={visible}
        onCancel={toggle}
        onConfirm={async (e: MouseEvent) => {
          if (email === "") {
            e.preventDefault();
          } else {
            setLoading(true);
            const { data, error } = await supabase.auth.api.inviteUserByEmail(email);
            setLoading(false);
            console.log(data, error);

            toggle();
          }
        }}
        contentStyle={{ width: "400px" }}
        loading={loading}
      >
        <Input
          icon={<IconMail />}
          label="email"
          style={{ width: "320px" }}
          placeholder="@exmple.com"
          onChange={onChangeEmail}
          value={email}
        />
      </Modal>
    </footer>
  );
};
