import { NextPage } from "next";
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

    if (!data) return <p>データがありません</p>;
    if (error) return <p>データの取得に失敗しました。</p>;

    const reverseItem = async (i: number) => {
        const clickData = data[i]
        console.log({ ...clickData, approve: false, shopped: false });

        await supabase.from("kai-mono-list").update({ ...clickData, approve: false, shopped: false }).eq("id", clickData.id)

        const reItem = data.slice(i, 1);
        mutate("historyData", reItem)
        return [...reItem,];
    };

    return (
        <Layout>
            <div className="mt-4">
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
                                        // mutate("historyData", data, false);
                                    }}
                                    className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
                                >
                                    再購入
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
