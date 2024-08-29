import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import MobileNav from "@/components/common/MobileNav";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Fragment>
      <Header />
      <Navigation />
      <MobileNav />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AppLayout;
