import type { User } from "@supabase/supabase-js";
import type { VFC } from "react";
import type { ItemsData } from "../libs/type";

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
          className="inline-block font-bold px-3 lg:px-5 py-1 lg:py-2 bg-primary text-white rounded-lg"
        >
          OK
        </button>
        <button
          onClick={onClickDeleteItems}
          className="inline-block font-bold px-3 lg:px-5 py-1 lg:py-2 bg-white text-primary rounded-lg"
        >
          {user.id === item.user_id ? "削除" : "要らない"}
        </button>
      </div>
    </ul>
  );
};
