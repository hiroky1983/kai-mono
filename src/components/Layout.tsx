import type { ReactNode, VFC } from "react";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <div className="bg-gray-300">
      <div
        className="container mx-auto grid
 grid-rows-[auto,1fr,auto] min-h-screen"
      >
        <Header />
        <main className="px-4 text-gray-600 bg-gray-100">
          <div>{props.children}</div>
        </main>
      </div>
    </div>
  );
};
