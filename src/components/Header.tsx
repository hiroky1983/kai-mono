import React from "react";
import { Auth, Button, IconChrome, Toggle } from "@supabase/ui";
import { supabase } from "../libs/supabase";
import Image from "next/image";

const Header = () => {
  const { user } = Auth.useUser();
  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  };

  return (
    <div className="flex">
      <Image
        src="/kai-mono__1_-removebg-preview.png"
        alt="logo"
        width={130}
        height={130}
      />
      <Toggle />
      <Button icon={<IconChrome />}>Sign in</Button>
    </div>
  );
};

export default Header;
