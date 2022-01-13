import { Auth } from "@supabase/ui";
import { NextPage } from "next";
import { ChangeEvent, ReactNode, useState } from "react";
import React from "react";
import { Layout } from "../components/Layout";
import { List } from "../components/List";
import { supabase } from "../libs/supabase";
import { WaitList } from "../components/WaitList";
import { InputArea } from "../components/InputArea";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const [waitApploveItems, setWaitApploveItems] = useState([]);
  const [apploveItems, setApploveItems] = useState([]);
  const { user } = Auth.useUser();
  console.log("街", waitApploveItems);
  console.log("しゃーなし", apploveItems);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onClickAddWaitItems = () => {
    if (inputText === "") return;
    const newItems = [...waitApploveItems, inputText];
    setWaitApploveItems(newItems);
    setInputText("");
  };
  const onClickAddItems = (i: number) => {
    const newWaitItems = [...waitApploveItems];
    newWaitItems.splice(i, 1);

    const newItems = [...apploveItems, waitApploveItems[i]];
    setWaitApploveItems(newWaitItems);
    setApploveItems(newItems);
  };

  if (user) {
    return (
      <div>
        <InputArea
          inputText={inputText}
          handleChange={handleChange}
          onClickAddWaitItems={onClickAddWaitItems}
        />
        <div className="grid auto-rows-max">
          <div className="mt-2">
            <h2>承認待ちのアイテム</h2>
            <WaitList
              items={waitApploveItems}
              onClickAddItems={onClickAddItems}
            />
          </div>
          <div>
            <h2 className="">買い物リスト</h2>
            <List items={apploveItems} />
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
