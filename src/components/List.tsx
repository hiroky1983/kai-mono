import React, { VFC } from "react";
import { ItemsData } from "../pages";

type Props = {
  items: ItemsData[];
  onClickShoppedItems: (i: number) => void;
};

export const List: VFC<Props> = (props) => {
  const { items, onClickShoppedItems } = props;
  return (
    <div>
      <ul>
        {items && items.map((item, i) => {
          return (
            <div
              className="flex my-2 items-center justify-between gap-2"
              key={item.id}
            >
              <li className="flex-grow">{item.itemName}</li>
              <button
                onClick={() => onClickShoppedItems(i)}
                className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
              >
                買った
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
