import AuthHeader from "@/components/Auth/AuthHeader";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Fragment>
      <AuthHeader />
      <main className="siteContainer">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AuthLayout;
