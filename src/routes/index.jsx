import { Routes,Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/views/Auth/Login";
import ResetPassword from "@/views/Auth/ResetPassword";
import ForgotPassword from "@/views/Auth/ForgotPassword";
import Projects from "@/views/App/Projects";
import Dashboard from "@/views/App/Dashboard";
import Profile from "@/views/App/Profile";
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default AppRouter