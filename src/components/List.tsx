import React, { VFC } from "react";
import { ItemsData } from "../pages";

type Props = {
  items: ItemsData[];
  onClickShoppedItems: () => void;
};

export const List: VFC<Props> = (props) => {
  const { items, onClickShoppedItems } = props;
  return (
    <div>
      <ul>
        {items && items.map((item) => {
          return (
            <div
              className="flex my-1 items-center justify-between gap-2"
              key={item.id}
            >
              <li className="flex-grow">{item.itemName}</li>
              <button
                onClick={() => onClickShoppedItems()}
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
