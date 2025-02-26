import Header from "@/components/App/Header";
import Navigation from "@/components/App/Navigation";
import MobileNav from "@/components/common/MobileNav";
import ProjectSidebar from "@/components/common/ProjectSidebar";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";

const AppLayout = () => {
  const { data: companyData, isSuccess } = useGetCompanyBySubdomainQuery();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && companyData?.is_active === false && location.pathname !== '/404') {
      navigate('/blocked');
    }
  }, [companyData, isSuccess, location, navigate]);

  return (
    <Fragment>
      <Header />
      <ProjectSidebar />
      <Navigation />
      <MobileNav />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AppLayout;
