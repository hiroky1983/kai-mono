import { NextPage } from "next";
import Head from "next/head";

import Auth from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Auth />
      </main>
    </div>
  );
};

export default Home;
