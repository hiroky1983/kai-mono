import React, { VFC } from "react";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAddWaitItems: () => void;
  inputText: string;
};

export const InputArea: VFC<Props> = (porps) => {
  const { handleChange, onClickAddWaitItems, inputText } = porps;
  return (
    <div className="flex h-full">
      <input
        type="text"
        className="mr-2 px-2 py-1 lg:py-2 w-4/5 rounded-md ring-1 ring-primary outline-none dark:text-gray-600"
        placeholder="買うものを入力"
        onChange={handleChange}
        value={inputText}
      />
      <button
        onClick={onClickAddWaitItems}
        className="inline-block px-3 lg:px-4 py-1 lg:py-2  bg-primary text-white rounded-lg"
      >
        追加
      </button>
    </div>
  );
};
