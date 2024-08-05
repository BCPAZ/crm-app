import Header from "@/components/App/Header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AppLayout;
