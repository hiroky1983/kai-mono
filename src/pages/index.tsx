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

type ItemsData = {
  id: number;
  user_id: string;
  itemName: string;
  approve: boolean;
  shopped: boolean;
  created_at: Date;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const [waitApproveItems, setwaitApproveItems] = useState([]);
  const [approveItems, setapproveItems] = useState([]);
  const [maxId, setMaxId] = useState(0);
  const [initialData, setInitialData] = useState<ItemsData>({
    id: 0,
    user_id: "",
    itemName: "",
    approve: false,
    shopped: false,
    created_at: null,
  });
  const { user } = Auth.useUser();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getData();
  }, [user, setwaitApproveItems]);

  const getData = async () => {
    try {
      const list = await supabase.from("kai-mono-list").select()
      const listData = list.data;
      const itemLists = listData.map((i) => {
        return i.itemName;
      })
      setwaitApproveItems(itemLists)
      listData.forEach((i) => {
        if (!i) {
          setMaxId(0)
        } else {
          setMaxId(Math.max(i.id))
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const onClickAddWaitItems = useCallback(async (i: number) => {
    if (inputText === "") return;
    const newItems = [...waitApproveItems, inputText];
    setwaitApproveItems(newItems);

    const updateData = {
      id: maxId + 1,
      user_id: user.id,
      itemName: inputText,
      approve: false,
      shopped: false,
      created_at: new Date(),
    }
    console.log(updateData);

    setInitialData(updateData)
    await supabase.from("kai-mono-list").insert([updateData])
    setInputText("");
  }, [inputText, waitApproveItems]);

  const onClickAddItems = useCallback(
    (i: number) => {
      const newWaitItems = [...waitApproveItems];
      newWaitItems.splice(i, 1);

      const newItems = [...approveItems, waitApproveItems[i]];
      setwaitApproveItems(newWaitItems);
      setapproveItems(newItems);
    },
    [waitApproveItems, approveItems]
  );

  const onClickShoppedItems = useCallback(
    (i: number) => {
      const newItems = [...approveItems];
      newItems.splice(i, 1);
      setapproveItems(newItems);
    },
    [approveItems]
  );

  const onClickDeleteItems = useCallback(
    (i: number) => {
      const newItems = [...waitApproveItems];
      newItems.splice(i, 1);
      console.log(i);

      setwaitApproveItems(newItems);
    },
    [waitApproveItems]
  );
  console.log(maxId);

  if (user) {
    return (
      <div>
        <InputArea
          inputText={inputText}
          handleChange={handleChange}
          onClickAddWaitItems={(i) => onClickAddWaitItems(i)}
        />
        <div>
          <div className="mt-2 h-60">
            <h2 className="text-xl">承認待ちのアイテム</h2>
            <WaitList
              items={waitApproveItems}
              onClickAddItems={onClickAddItems}
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
