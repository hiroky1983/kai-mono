import { Auth } from "@supabase/ui";
import { NextPage } from "next";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import React from "react";
import { Layout } from "../components/Layout";
import { List } from "../components/List";
import { supabase } from "../libs/supabase";
import { WaitList } from "../components/WaitList";
import { InputArea } from "../components/InputArea";
import { useRouter } from "next/dist/client/router";

type Props = {
  children: ReactNode;
};

export type ItemsData = {
  id: number;
  user_id: string;
  itemName: string;
  approve: boolean;
  shopped: boolean;
  created_at: Date;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const [waitApproveItems, setWaitApproveItems] = useState<ItemsData[]>();
  const [approveItems, setApproveItems] = useState<ItemsData[]>();
  const [maxId, setMaxId] = useState(0);
  const { user } = Auth.useUser();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getData();
  }, [user, setWaitApproveItems]);

  const getData = async () => {
    try {
      const list = await supabase.from("kai-mono-list").select();
      const listData = list.data as ItemsData[];

      const appItem = listData.filter((item) => item.approve === true);
      const waitItem = listData.filter((item) => item.approve === false);
      setApproveItems(appItem);
      setWaitApproveItems(waitItem);

      listData.forEach((i) => {
        if (!i) {
          setMaxId(0);
        } else {
          setMaxId(Math.max(i.id));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const onClickAddWaitItems = useCallback(async () => {
    if (inputText === "") return;
    const updateData = {
      id: maxId + 1,
      user_id: user.id,
      itemName: inputText,
      approve: false,
      shopped: false,
      created_at: new Date(),
    };
    const newItems = [...waitApproveItems, updateData];
    setWaitApproveItems(newItems);
    await supabase.from("kai-mono-list").insert(updateData);
    setInputText("");
  }, [inputText, waitApproveItems]);

  const onClickAddItems = useCallback(
    async (i: number) => {
      const newWaitItems = [...waitApproveItems];
      newWaitItems.splice(i, 1);

      await supabase.from("kai-mono-list")
      const newItems = [...approveItems, waitApproveItems[i]];
      setWaitApproveItems(newWaitItems);
      setApproveItems(newItems);
    },
    [waitApproveItems, approveItems]
  );

  const onClickShoppedItems = useCallback(
    (i: number) => {
      const newItems = [...approveItems];
      newItems.splice(i, 1);
      setApproveItems(newItems);
    },
    [approveItems]
  );

  const onClickDeleteItems = useCallback(
    async (i: number) => {
      const newItems = [...waitApproveItems];
      const list = await supabase.from("kai-mono-list").select();
      const listData = list.data;
      const resultData = listData.find((data) => {
        console.log(data.name);
        const item = newItems.splice(i, 1);
        return data.name === item[0];
      });

      console.log(resultData);
      await supabase.from("kai-mono-list").delete().match(resultData);
      setWaitApproveItems(newItems);
    },
    [waitApproveItems]
  );

  if (user) {
    return (
      <div>
        <InputArea
          inputText={inputText}
          handleChange={handleChange}
          onClickAddWaitItems={onClickAddWaitItems}
        />
        <div>
          <div className="mt-2 h-60">
            <h2 className="text-xl">承認待ちのアイテム</h2>
            <WaitList
              items={waitApproveItems}
              onClickAddItems={(i) => onClickAddItems(i)}
              onClickDeleteItems={onClickDeleteItems}
            />
          </div>
          <div className="h-60">
            <h2 className="text-xl">買い物リスト</h2>
            <List
              items={approveItems}
              onClickShoppedItems={onClickShoppedItems}
            />
          </div>
        </div>
      </div>
    );
  }
  return <>{props.children}</>;
};

const Home: NextPage = () => {
  return (
    <Layout>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container>
          <div className="pt-8">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={supabase}
                providers={["google"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </Layout>
  );
};

export default Home;
