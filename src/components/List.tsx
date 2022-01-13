import React, { VFC } from "react";

type Props = {
  items: string[];
  onClickShoppedItems: (i: number) => void;
};

export const List: VFC<Props> = (props) => {
  const { items, onClickShoppedItems } = props;
  return (
    <div>
      <ul>
        {items.map((item, i) => {
          return (
            <div
              className="flex my-1 items-center justify-between gap-2"
              key={i}
            >
              <li className="flex-grow">{item}</li>
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
