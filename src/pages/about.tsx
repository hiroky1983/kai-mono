import { Button } from "@supabase/ui";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { Layout } from "../components/Layout";

const About: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="relative">
        <Image
          src="/gettyimages-542930780-612x612.jpeg"
          layout="responsive"
          width="300px"
          height="200px"
        />
        <p className="absolute top-1/3 left-4 text-white text-opacity-80 text-2xl sm:text-4xl p-3 bg-gray-800 bg-opacity-30 font-extrabold md:font-black md:text-6xl">
          買い物をもっと効率的に
        </p>
      </div>
      <div className="mx-4">
        <h2 className="text-center py-6 font-extrabold text-4xl">
          このアプリでできること
        </h2>
        <div className="flex justify-center my-4 text-center">
          <div className="grid gap-4 md:flex">
            <div className="w-80 shadow-lg p-8 rounded-lg dark:bg-gray-500">
              <div className="flex justify-center">
                <Image src="/Shopping-bro .png" width="180px" height="240px" />
              </div>
              <h3 className="py-4 font-bold text-2xl">パートナーとのリストの共有</h3>
              <p className="mb-6">買うもののリストを相手と共有できます</p>
            </div>
            <div className="w-80 shadow-lg p-8 rounded-lg dark:bg-gray-500">
              <div className="flex justify-center">
                <Image
                  src="/Add tasks-rafiki .png"
                  width="180px"
                  height="240px"
                />
              </div>
              <h3 className="py-4 font-bold text-2xl">購入後の完了確認</h3>
              <p className="mb-6">
                パートナーに買うものを事前に確認してもらい買うものの重複を防げ余分なコストを削減できます
              </p>
            </div>
            <div className="w-80 shadow-lg p-8 rounded-lg dark:bg-gray-500">
              <div className="flex justify-center">
                <Image
                  src="/Thinking face-rafiki .png"
                  width="180px"
                  height="240px"
                />
              </div>
              <h3 className="py-4 font-bold text-2xl">買い物時スマホからリストを確認</h3>
              <p className="mb-6">買いもののときの買い忘れを防ぐことができます</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-center py-6 font-extrabold text-4xl">
            PWA対応でスマホアプリのように使える
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="md:flex items-center">
              <div className="flex justify-center">
                <Image
                  className="object-contain"
                  src="/pwadisc1.png"
                  width="320px"
                  height="320px"
                />
              </div>
              <p className="text-lg">①スマホから下の赤枠のボタンを押す</p>
            </div>
            <div className="md:flex items-center">
              <div className="flex justify-center">
                <Image
                  className="object-contain"
                  src="/pwadisc2.png"
                  width="320px"
                  height="320px"
                />
              </div>
              <p className="text-lg">②赤枠の『ホーム画面に追加』ボタンを押す</p>
            </div>
            <div className="md:flex items-center">
              <div className="flex justify-center">
                <Image
                  className="object-contain"
                  src="/pwadisc3.png"
                  width="320px"
                  height="320px"
                />
              </div>
              <p className="text-lg">③ホーム画面に追加できていればOK</p>
            </div>
            <div className="md:flex items-center">
              <div className="flex justify-center">
                <Image
                  className="object-contain"
                  src="/pwadisc4.png"
                  width="320px"
                  height="320px"
                />
              </div>
              <p className="text-lg">④スマホアプリと同じ挙動で仕様することが出来ます</p>
            </div>
          </div>
        </div>
        <div className="relative mb-8">
          <h2 className="text-center py-16 font-extrabold text-4xl">
            さっそくつかってみよう
          </h2>
          <Image
            className="object-contain"
            src="/kai-mono__1_-removebg-preview.png"
            width="180px"
            height="180px"
          />
          <Button
            style={{
              backgroundColor: "#65D8A5",
              float: "right",
              position: "absolute",
              bottom: "30px",
              right: "20px",
              padding: "18px",
              fontSize: "20px"
            }}
            onClick={() => router.push("/")}
          >
            ログイン
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
