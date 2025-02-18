import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSubdomain from "@/hooks/useSubdomain";
import { useEffect, useState } from "react";
import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";
import LoadingScreen from "@/components/common/LoadingScreen";

const ProtectedRoute = () => {
  const subdomain = useSubdomain();

  const navigate = useNavigate();

  const { isError, isFetching } = useGetCompanyBySubdomainQuery(subdomain);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError]);

  if (isFetching) return <LoadingScreen />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
