import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(
  () => import("../features/Auth/Pages/LoginPage/LoginPage")
);
const RegisterPage = lazy(
  () => import("../features/Auth/Pages/RegisterPage/RegisterPage")
);

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};
