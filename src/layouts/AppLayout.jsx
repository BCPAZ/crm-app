import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Fragment>
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AppLayout;
