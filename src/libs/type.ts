export type ItemsData = {
  id: number;
  user_id: string;
  itemName: string;
  approve: boolean;
  shopped: boolean;
  created_at: Date;
};

export type UserState = {
  id: string;
  pairUser: string;
  isDarkMode: boolean;
  user_name: string;
  avatar_url: string;
};
