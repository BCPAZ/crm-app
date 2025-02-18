import AuthHeader from "@/components/Auth/AuthHeader";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";
import useSubdomain from "@/hooks/useSubdomain";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {

  const subdomain = useSubdomain();

  const navigate = useNavigate();

  const { isError, isFetching } = useGetCompanyBySubdomainQuery(subdomain);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError]);

  if (isFetching) return <LoadingScreen />;

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
