import { NextPage } from "next";
import Image from "next/image";
import { Layout } from "../components/Layout";


const About: NextPage = () => {
    return (
        <Layout>
            <div className="relative">
                <Image src="/gettyimages-542930780-612x612.jpeg" layout="responsive" width="300px" height="200px" />
                <p className="absolute top-6 left-6 text-white p-3 bg-gray-800 bg-opacity-30 font-extrabold">買い物をもっと効率的に</p>
            </div>
            <h2 className="text-center py-6 font-bold text-2xl">このアプリでできること</h2>
            <div className="flex justify-center my-4 text-center">
                <div className="grid gap-4 md:flex">
                    <div className="w-80 shadow-lg p-6 rounded-lg dark:bg-gray-500">
                        <div className="flex justify-center">
                            <Image src="/Shopping-bro .png" width="120px" height="240px" />
                        </div>
                        <h3 className="py-2 font-bold">パートナーとのリストの共有</h3>
                        <p>買うもののリストを相手と共有できます</p>
                    </div>
                    <div className="w-80 shadow-lg p-6 rounded-lg dark:bg-gray-500">
                        <div className="flex justify-center">
                            <Image src="/Add tasks-rafiki .png" width="120px" height="240px" />
                        </div>
                        <h3 className="py-2 font-bold">購入後の完了確認</h3>
                        <p>パートナーに買うものを事前に確認してもらい買うものの重複を防げ余分なコストを削減できます</p>
                    </div>
                    <div className="w-80 shadow-lg p-6 rounded-lg dark:bg-gray-500">
                        <div className="flex justify-center">
                            <Image src="/Thinking face-rafiki .png" width="120px" height="240px" />
                        </div>
                        <h3 className="py-2 font-bold">買い物時スマホからリストを確認</h3>
                        <p>買いもののときの買い忘れを防ぐことができます</p>
                    </div>
                </div>
            </div>
            <h2 className="text-center py-6 font-bold text-2xl">PWA対応でスマホアプリのように使える</h2>
        </Layout>
    )
}

export default About;