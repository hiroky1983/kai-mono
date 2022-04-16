import useSWR from "swr";

import type { UserState } from "../../libs/type";
import { supabase } from "../supabase";

const fetcheData = async (): Promise<UserState[]> => {
  const fetch = await supabase.from("user").select();
  return fetch.data;
};

export const useUserState = () => {
  const { data: userState, error: userStateError } = useSWR(
    "getUser",
    fetcheData
  );

  return { userState, userStateError };
};
