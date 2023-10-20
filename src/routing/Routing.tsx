import useUser from "features/Users/hooks/useUser";
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { AuthRoutes } from "./Auth.routes";
import { PrivateRoutes } from "./Private.routes";

const Routing = () => {
  const { user, refetchUser } = useUser();

  useEffect(() => {
    refetchUser();
  }, []);

  if (!user) return <AuthRoutes />;
  else if (!!user) return <PrivateRoutes />;
  return <Navigate to="/auth/login" />;
};

export default Routing;
