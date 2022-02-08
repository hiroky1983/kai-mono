import { Center, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useSWR, { useSWRConfig } from "swr";
import { ItemsData } from ".";
import { Layout } from "../components/Layout";
import { supabase } from "../libs/supabase";
import { NotFound } from "./NotFound";

const user = supabase.auth.user();

const fecther = async (): Promise<ItemsData[]> => {
  const fetch = await supabase.from("kai-mono-list").select("*").eq("user_id", user.id);
  const filterData = fetch.data.filter((d) => {
    return d.approve === true && d.shopped === true;
  });
  const userQuery = await supabase.from("user").select();
  const userData = userQuery.data;
  const userDataId = userData.filter((d) => {
    return d.pairUser === user.id;
  });
  const filterPairUser = userDataId.find((d) => {
    return d.user_name !== "テストユーザー";
  })
  const pairKiaMonoList = await supabase.from("kai-mono-list").select("*").eq("user_id", filterPairUser.user_id).eq("approve", true).eq("shopped", true);

  return [...filterData, ...pairKiaMonoList.data];
};

const History: NextPage = () => {
  const { data, error } = useSWR("historyData", fecther);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  if (!user && data) router.replace("/");
  if (!data) return <Layout><Center><Spinner color="#65D8A5" /></Center></Layout>;
  if (error) return <NotFound />
  const reverseItem = async (i: number) => {
    const clickData = data[i];
    await supabase
      .from("kai-mono-list")
      .update({ ...clickData, approve: false, shopped: false })
      .eq("id", clickData.id);
    const reItem = data.slice(i, 1);
    mutate("historyData", reItem);
    return [...reItem];
  };

  const onClickDeleteItems = async (i: number) => {
    const clickData = data[i];
    await supabase.from("kai-mono-list").delete().eq("id", clickData.id);
    const item = data.splice(i, 1);
    mutate("historyData", item);
  };

  return (
    <Layout>
      <div className="mt-5 mx-4">
        <h2 className="text-xl underline">過去のリスト</h2>
        <ul>
          {data.map((d, i) => {
            return (
              <div
                key={d.id}
                className="flex my-1 items-center justify-between gap-2"
              >
                <li className="flex-grow">{d.itemName}</li>
                <button
                  onClick={() => {
                    reverseItem(i);
                  }}
                  className="inline-block px-3 py-1 bg-primary text-white rounded-lg"
                >
                  再購入
                </button>
                <button
                  onClick={() => onClickDeleteItems(i)}
                  className="inline-block px-3 lg:px-5 py-1 lg:py-2 bg-white text-primary rounded-lg"
                >
                  削除
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default History;
