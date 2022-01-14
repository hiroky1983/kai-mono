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
import { SupabaseRealtimeClient } from "@supabase/supabase-js/dist/main/lib/SupabaseRealtimeClient";

type Props = {
  children: ReactNode;
};

type ItemsData = {
  id: string;
  user_id: string;
  itemName: string;
  approve: boolean;
  shopped: boolean;
  created_at: Date;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const [waitApploveItems, setWaitApploveItems] = useState([]);
  const [apploveItems, setApploveItems] = useState([]);
  const [initialData, setInitialData] = useState<ItemsData>({
    id: "",
    user_id: "",
    itemName: "",
    approve: false,
    shopped: false,
    created_at: new Date(),
  });
  const { user } = Auth.useUser();
  console.log(user);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const onClickAddWaitItems = useCallback(() => {
    if (inputText === "") return;
    const newItems = [...waitApploveItems, inputText];
    setWaitApploveItems(newItems);
    setInputText("");
  }, [inputText, waitApploveItems]);

  const onClickAddItems = useCallback(
    (i: number) => {
      const newWaitItems = [...waitApploveItems];
      newWaitItems.splice(i, 1);

      const newItems = [...apploveItems, waitApploveItems[i]];
      setWaitApploveItems(newWaitItems);
      setApploveItems(newItems);
    },
    [waitApploveItems, apploveItems]
  );

  const onClickShoppedItems = useCallback(
    (i: number) => {
      const newItems = [...apploveItems];
      newItems.splice(i, 1);
      setApploveItems(newItems);
    },
    [apploveItems]
  );

  const onClickDeleteItems = useCallback(
    (i: number) => {
      const newItems = [...waitApploveItems];
      newItems.splice(i, 1);
      setWaitApploveItems(newItems);
    },
    [waitApploveItems]
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
              items={waitApploveItems}
              onClickAddItems={onClickAddItems}
              onClickDeleteItems={onClickDeleteItems}
            />
          </div>
          <div className="h-60">
            <h2 className="text-xl">買い物リスト</h2>
            <List
              items={apploveItems}
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
