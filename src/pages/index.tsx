import { Auth, IconAlertCircle, Modal } from "@supabase/ui";
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
  const [visible, setVisible] = useState(false);
  const { user } = Auth.useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const toggle = () => {
    setVisible(!visible);
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

  const onClickShoppedItems = (i: number) => {
    const newItems = [...apploveItems];
    newItems.splice(i, 1);
    setApploveItems(newItems);
  };

  const onClickDeleteItems = (i: number) => {
    const newItems = [...waitApploveItems];
    newItems.splice(i, 1);
    setWaitApploveItems(newItems);
    toggle();
  };

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
              onClickDeleteItems={toggle}
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
        <Modal
          title="削除"
          description="こちらのアイテムを削除してもよろしいですか？"
          visible={visible}
          onCancel={toggle}
          onConfirm={onClickDeleteItems}
          variant="danger"
          icon={<IconAlertCircle background="red" size="xlarge" />}
        ></Modal>
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
