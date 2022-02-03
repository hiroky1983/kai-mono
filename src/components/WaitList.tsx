import { User } from "@supabase/supabase-js";
import React, { VFC } from "react";
import { ItemsData } from "../pages";

type Props = {
  item: ItemsData;
  onClickAddItems: () => void;
  onClickDeleteItems: () => void;
  user: User;
};

export const WaitList: VFC<Props> = (props) => {
  const { item, onClickAddItems, onClickDeleteItems, user } = props;
  return (
    <ul>
      <div
        className="flex my-1 items-center justify-between gap-2"
        key={item.id}
      >
        <li className="flex-grow">{item.itemName}</li>
        <button
          onClick={onClickAddItems}
          className="inline-block px-3 lg:px-5 py-1 lg:py-2 bg-primary text-white rounded-lg"
        >
          OK
        </button>
        <button
          onClick={onClickDeleteItems}
          className="inline-block px-3 lg:px-5 py-1 lg:py-2 bg-primary text-white rounded-lg"
        >
          {user.id === item.user_id ? "削除" : "要らない"}
        </button>
      </div>
    </ul>
  );
};
