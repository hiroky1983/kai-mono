import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useSWR, { useSWRConfig } from "swr";
import { ItemsData } from ".";
import { Layout } from "../components/Layout";
import { supabase } from "../libs/supabase";

const fecther = async (): Promise<ItemsData[]> => {
  const fetch = await supabase.from("kai-mono-list").select();
  const filterData = fetch.data.filter((d) => {
    return d.approve === true && d.shopped === true;
  });
  return filterData;
};

const History: NextPage = () => {
  const { data, error } = useSWR("historyData", fecther);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const user = supabase.auth.user();

  if (!user && data) router.replace("/");
  if (!data) return <p className="text-center">データがありません</p>;
  if (error) return <p className="text-center">データの取得に失敗しました。</p>;

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
      <div className="mt-4 mx-4">
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
                  {user.id === d.user_id ? "削除" : "要らない"}
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
