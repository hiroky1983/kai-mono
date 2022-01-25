import { NextPage } from "next";
import useSWR from "swr";
import { ItemsData } from ".";
import { Layout } from "../components/Layout";
import { supabase } from "../libs/supabase";

const fecther = async (): Promise<ItemsData[]> => {
    const fetch = await supabase.from("kai-mono-list").select();
    return fetch.data;
}

const History: NextPage = () => {

    const { data, error } = useSWR("historyData", fecther)

    if (!data) return <p>データがありません</p>
    if (error) return <p>データの取得に失敗しました。</p>

    const newData = () => {
        const filterData = data.filter((d) => {
            return d.approve === true
        })
        return filterData
    }

    return (
        <Layout>
            <div className="mt-4">
                <h2 className="text-xl underline">過去のリスト</h2>
                <ul>
                    {newData().map((d, i) => {
                        return (
                            <div
                                key={d.id}
                                className="flex my-1 items-center justify-between gap-2"
                            >
                                <li className="flex-grow">
                                    {d.itemName}

                                </li>
                                <button
                                    onClick={() => (i)}
                                    className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
                                >
                                    リストに戻す
                                </button>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </Layout>
    );
};

export default History;