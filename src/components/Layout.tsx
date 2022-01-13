import type { ReactNode, VFC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-600">
      <div className="container mx-auto grid grid-rows-[auto,1fr] min-h-screen">
        <Header />
        <main className="px-4 text-gray-600 bg-gray-100 dark:text-white dark:bg-gray-600">
          <div>{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
