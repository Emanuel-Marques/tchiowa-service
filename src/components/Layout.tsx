import { Outlet } from "react-router-dom";
import { Menu } from "./Navbar";

export function Layout(){
  return(
    <>
      <Menu />
      <Outlet />
    </>
  ) ;
}