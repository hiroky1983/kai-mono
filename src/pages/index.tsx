import { Auth, Button } from "@supabase/ui";
import { NextPage } from "next";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { List } from "../components/List";
import { supabase } from "../libs/supabase";
import { WaitList } from "../components/WaitList";
import { InputArea } from "../components/InputArea";
import { PostgrestResponse, User } from "@supabase/supabase-js";
import { Layout } from "../components/Layout";
import { ItemsData } from "../libs/type";
import { makeId } from "../functions/function";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const [waitApproveItems, setWaitApproveItems] = useState<ItemsData[]>([]);
  const [approveItems, setApproveItems] = useState<ItemsData[]>([]);
  const [maxId, setMaxId] = useState(0);
  const [session, setSession] = useState<User>(null);
  const [isApprove, setIsApprove] = useState(false);
  const [isShopped, setIsShopped] = useState(false);
  const { user } = Auth.useUser();

  const handleInsertWaitItems = (payload: { new: ItemsData }) => {
    setWaitApproveItems([...waitApproveItems, payload.new]);
  };
  const handleInsertApproveItems = (payload: {
    new: ItemsData;
    old: { id: number };
  }) => {
    setApproveItems([...approveItems, payload.new]);
    setWaitApproveItems(
      waitApproveItems.filter((item) => item.id !== payload.old.id)
    );
  };
  const handleShopped = (payload: { old: { id: number } }) => {
    const newApproveItems = approveItems.filter((item) => {
      return item.id !== payload.old.id;
    });
    setApproveItems(newApproveItems);
  };
  const handleDelete = (payload: { old: { id: number } }) => {
    const deleteItem = waitApproveItems.filter(
      (item) => item.id !== payload.old.id
    );
    setWaitApproveItems(deleteItem);
  };

  useEffect(() => {
    supabase
      .from("kai-mono-list")
      .on("INSERT", handleInsertWaitItems)
      .subscribe();
  }, [waitApproveItems]);

  useEffect(() => {
    if (isApprove) {
      supabase
        .from("kai-mono-list")
        .on("UPDATE", handleInsertApproveItems)
        .subscribe();
    } else if (isShopped) {
      supabase.from("kai-mono-list").on("UPDATE", handleShopped).subscribe();
    }
  }, [waitApproveItems, approveItems, isApprove, isShopped]);

  useEffect(() => {
    supabase.from("kai-mono-list").on("DELETE", handleDelete).subscribe();
  }, [waitApproveItems]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (e == "SIGNED_IN") {
        setSession(session.user);
      }
    });
    getData();
  }, [user]);

  const getData = async () => {
    try {
      const userMetaData = user.user_metadata;
      const avatarUrl = userMetaData.avatar_url;
      const fullName = userMetaData.full_name;
      const userQuery = await supabase.from("user").select();
      const userData = userQuery.data;
      const userDataId = userData.find((d) => {
        return d.pairUser === user.id;
      });
      const allList = await supabase.from("kai-mono-list").select();
      const list = await supabase
        .from("kai-mono-list")
        .select("*")
        .eq("user_id", user.id);

      let pairList: PostgrestResponse<ItemsData>;
      if (userDataId) {
        pairList = await supabase
          .from("kai-mono-list")
          .select("*")
          .eq("user_id", userDataId.user_id);
      }
      //新規ユーザー登録処理
      if (session) {
        const findData = userQuery.data.findIndex((data) => {
          return data.user_id === session.id;
        });
        if (findData === -1 && session) {
          try {
            const initialUser = {
              id: makeId(),
              user_id: session.id,
              pairUser: "",
              isDarkMode: false,
              user_name: fullName,
              avatar_url: avatarUrl,
            };
            await supabase.from("user").insert(initialUser);
          } catch (error) {
            console.log(error);
          }
        }
      }
      const listData = list.data as ItemsData[];
      if (pairList) {
        const pairListData = pairList.data as ItemsData[];
        const convertList = [...listData, ...pairListData];
        const appItem = convertList.filter(
          (item) => item.approve === true && item.shopped === false
        );
        const waitItem = convertList.filter((item) => item.approve === false);
        setApproveItems(appItem);
        setWaitApproveItems(waitItem);
      } else {
        const appItem = listData.filter(
          (item) => item.approve === true && item.shopped === false
        );
        const waitItem = listData.filter((item) => item.approve === false);
        setApproveItems(appItem);
        setWaitApproveItems(waitItem);
      }
      const maxNum = Math.max(
        ...allList.data.map((i) => {
          if (!i) {
            return 0;
          } else {
            return i.id;
          }
        })
      );
      setMaxId(maxNum);
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
    await supabase.from("kai-mono-list").insert(updateData);
    setInputText("");
    setMaxId(maxId + 1);
  }, [inputText, waitApproveItems]);

  const onClickAddItems = useCallback(
    async (i: number) => {
      setIsApprove(true);
      const newWaitItems = [...waitApproveItems];
      const item = newWaitItems.splice(i, 1);
      const updateItem = item.map((update) => {
        return { ...update, approve: true };
      });

      await supabase
        .from("kai-mono-list")
        .update({ approve: updateItem[0].approve })
        .eq("id", updateItem[0].id);
      setIsApprove(false);
    },
    [waitApproveItems, approveItems]
  );

  const onClickShoppedItems = useCallback(
    async (i: number) => {
      setIsShopped(true);
      const newItems = [...approveItems];
      const item = newItems.splice(i, 1);
      const updateItem = item.map((update) => {
        return { ...update, shopped: true };
      });
      const { data: shoppedItem, error } = await supabase
        .from("kai-mono-list")
        .update({ shopped: updateItem[0].shopped })
        .eq("id", updateItem[0].id);
      setIsShopped(false);
    },
    [approveItems]
  );

  const onClickDeleteItems = useCallback(
    async (i: number) => {
      const newItems = [...waitApproveItems];
      const item = newItems.splice(i, 1);
      await supabase.from("kai-mono-list").delete().eq("id", item[0].id);
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
        <div className="flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl underline mt-4">承認待ちのアイテム</h2>
            <div className="my-2 overflow-y-scroll max-h-60">
              {waitApproveItems &&
                waitApproveItems.map((item, i) => {
                  return (
                    <WaitList
                      key={item.id}
                      user={user}
                      item={item}
                      onClickAddItems={() => onClickAddItems(i)}
                      onClickDeleteItems={() => onClickDeleteItems(i)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl underline mt-4">買い物リスト</h2>
            <div className="my-2 overflow-y-scroll max-h-64">
              {approveItems &&
                approveItems.map((item, i) => {
                  return (
                    <List
                      item={item}
                      key={item.id}
                      onClickShoppedItems={() => onClickShoppedItems(i)}
                    />
                  );
                })}
            </div>
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
        <div className="mx-5 mt-6">
          <Container>
            <div>
              <div className="w-full sm:w-96">
                <Auth
                  supabaseClient={supabase}
                  providers={["google"]}
                  socialColors={true}
                  onlyThirdPartyProviders
                />
                <Button
                  style={{
                    marginTop: "30px",
                    maxWidth: "400px",
                    backgroundColor: "#65D8A5",
                  }}
                  onClick={async () => {
                    try {
                      const { user, error } = await supabase.auth.signIn({
                        email: process.env.NEXT_PUBLIC_SAMPLE_EMAIL,
                        password: process.env.NEXT_PUBLIC_SAMPLE_PASSWORD,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  テストログイン
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Auth.UserContextProvider>
    </Layout>
  );
};

export default Home;
