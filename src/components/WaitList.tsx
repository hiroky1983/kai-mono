import React, { VFC } from "react";
import { ItemsData } from "../pages";

type Props = {
  items: ItemsData[];
  onClickAddItems: (i: number) => void;
  onClickDeleteItems: () => void;
};

export const WaitList: VFC<Props> = (props) => {
  const { items, onClickAddItems, onClickDeleteItems } = props;
  return (
    <div>
      <ul>
        {items &&
          items.map((item, i) => {
            return (
              <div
                className="flex my-1 items-center justify-between gap-2"
                key={item.id}
              >
                <li className="flex-grow">{item.itemName}</li>
                <button
                  onClick={() => onClickAddItems(i)}
                  className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
                >
                  OK
                </button>
                <button
                  onClick={() => onClickDeleteItems()}
                  className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
                >
                  要らない
                </button>
              </div>
            );
          })}
      </ul>
    </div>
  );
};
