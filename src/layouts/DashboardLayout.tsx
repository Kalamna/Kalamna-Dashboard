import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
export const MainLayout = () => (
  <div>
    <Sidebar />
    <Header />
    <Outlet />
    <Link to="/auth/login"> Login</Link>
  </div>
);
