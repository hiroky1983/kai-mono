import React, { VFC } from "react";

type Props = {
  items: string[];
};

export const List: VFC<Props> = (props) => {
  const { items } = props;
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
                onClick={() => onClickAddItems(i)}
                className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg"
              >
                OK
              </button>
              <button className="inline-block px-3 py-1 bg-green-400 text-white rounded-lg">
                要らない
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
