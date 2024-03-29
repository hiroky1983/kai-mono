import { useCallback, useEffect, useState } from "react";
import type { VFC, InputHTMLAttributes } from "react";
import {
  Button,
  Divider,
  Dropdown,
  IconBook,
  IconClipboard,
  IconLogOut,
  IconSearch,
  IconSettings,
  IconUser,
  Input,
  Modal,
  Typography,
} from "@supabase/ui";

import { supabase } from "../libs/supabase";
import { useRouter } from "next/dist/client/router";
import { UserState } from "../libs/type";
import { useAlert } from "../libs/hooks/useAlert";

const THIS_YEAR = new Date().getFullYear();

export const Footer: VFC = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchUserName, setSearchUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [resultName, setResultName] = useState("");
  const doneSave = useAlert("保存しました", "success");
  const undoneSave = useAlert("保存に失敗しました", "error");

  const userData = async () => {
    const authUser = await supabase.from("user").select();
    const data = authUser.data;
    if (user) {
      const returnData = data.find((d) => {
        return d.user_id === user.id;
      });
      if (returnData.user_name) {
        setUserName(returnData.user_name);
      }
    }
  };

  useEffect(() => {
    userData();
  }, [user]);

  const onChangeEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    useCallback((e) => setSearchUserName(e.target.value), [searchUserName]);

  const toggle = async () => {
    setVisible(!visible);
    await supabase.from("user").update({ isDarkMode: visible });
  };

  const onClickSearchUser = async (e: MouseEvent) => {
    try {
      if (searchUserName === "") {
        e.preventDefault();
      } else {
        setLoading(true);
        const { data, error } = await supabase.from("user").select("user_name");
        if (error) {
          throw new Error("情報の取得に失敗しました");
        }
        const result: UserState = data.find(
          (d) => d.user_name === searchUserName
        );
        result
          ? setResultName(result.user_name)
          : setResultName("ユーザーが見つかりませんでした");
        setLoading(false);
        setSearchUserName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickAddPairUser = async () => {
    try {
      const conversionPairUser = await supabase.from("user").select();
      const data = conversionPairUser.data;
      const pairUser = data.find((d) => {
        return d.user_name === resultName;
      });
      await supabase
        .from("user")
        .update({ pairUser: pairUser.user_id })
        .eq("user_id", user.id);
      setResultName("");
      doneSave();
      toggle();
    } catch (error) {
      console.log(error);
      undoneSave();
    }
  };

  const onClickSignOut = () => {
    if (user) {
      supabase.auth.signOut();
      router.replace("/");
    } else {
      router.push("/");
    }
  };

  return (
    <footer className="flex text-gray-600 bg-gray-200 dark:text-white dark:bg-gray-700 items-center justify-between h-16 sm:h-20">
      <small lang="en" className="ml-5">
        &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
      </small>
      <Dropdown
        style={{ display: "grid", gap: "12px", padding: "6px 0px" }}
        overlay={[
          <Dropdown.Item>
            <Typography.Text>
              {user && userName ? userName : "ユーザー名はありません"}
            </Typography.Text>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item
            onClick={() => router.push("/history")}
            icon={<IconClipboard />}
          >
            <Typography.Text>過去の買い物リスト</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item
            icon={<IconSearch />}
            onClick={toggle}
            disabled={!user || (router.pathname !== "/" && true)}
          >
            <Typography.Text>ユーザーを探す</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item
            icon={<IconBook />}
            onClick={() => router.push("/about")}
          >
            <Typography.Text>このアプリについて</Typography.Text>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item icon={<IconLogOut />} onClick={onClickSignOut}>
            {user ? "ログアウト" : "ログイン"}
          </Dropdown.Item>,
        ]}
      >
        <Button
          block
          size="medium"
          style={{ backgroundColor: "#65D8A5", padding: "16px" }}
        >
          <IconSettings />
        </Button>
      </Dropdown>
      <Modal
        closable
        confirmText={
          resultName === "" || resultName === "ユーザーが見つかりませんでした"
            ? "検索"
            : "保存"
        }
        cancelText="キャンセル"
        title="ユーザー検索"
        description="ユーザーを検索することができます。"
        visible={visible}
        onCancel={() => {
          setResultName("");
          setSearchUserName("");
          toggle();
        }}
        onConfirm={
          resultName === "" || resultName === "ユーザーが見つかりませんでした"
            ? onClickSearchUser
            : onClickAddPairUser
        }
        contentStyle={{ width: "380px" }}
        loading={loading}
      >
        <Input
          icon={<IconUser />}
          label={`ユーザー名：${resultName}`}
          style={{ width: "320px" }}
          placeholder="名前を入力"
          onChange={onChangeEmail}
          value={searchUserName}
        />
      </Modal>
    </footer>
  );
};
