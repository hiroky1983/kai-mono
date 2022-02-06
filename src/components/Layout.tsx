import type { ReactNode, VFC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <div className="container mx-auto grid grid-rows-[auto,1fr,auto] min-h-screen bg-gray-300 dark:bg-gray-600">
      <Header />
      <main className="text-gray-600 bg-gray-100 dark:text-white dark:bg-gray-600">
        <div>{props.children}</div>
      </main>
      <Footer />
    </div>
  );
};
