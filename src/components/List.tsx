import React, { VFC } from "react";
import { ItemsData } from "../pages";

type Props = {
  item: ItemsData;
  onClickShoppedItems: () => void;
};

export const List: VFC<Props> = (props) => {
  const { item, onClickShoppedItems } = props;
  return (
    <ul>
      <div
        className="flex my-2 items-center justify-between gap-2"
        key={item.id}
      >
        <li className="flex-grow">{item.itemName}</li>
        <button
          onClick={onClickShoppedItems}
          className="inline-block px-3 lg:px-5 py-1 lg:py-2 bg-primary text-white rounded-lg"
        >
          買った
        </button>
      </div>
    </ul>
  );
};
