import { Auth, Button } from "@supabase/ui";
import { NextPage } from "next";
import { ChangeEvent, ReactNode, useState } from "react";
import React from "react";
import { Layout } from "../components/Layout";
import { supabase } from "../libs/supabase";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const [inputText, setInputText] = useState("");
  const { user } = Auth.useUser();

  if (user) {
    return (
      <div>
        <div className="flex">
          <input
            type="text"
            className="mr-2 px-2 py-1 w-4/5 rounded-md ring-1 ring-green-400 focus-within:ring-green-500"
            placeholder="買うものを入力"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
          />
          <Button className="inline-block">追加</Button>

          {/* <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </Button> */}
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
          <div className="flex justify-center pt-8">
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
