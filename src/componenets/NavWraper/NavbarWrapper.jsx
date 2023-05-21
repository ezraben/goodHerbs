import { Outlet } from "react-router-dom";
import NavBarComponent from "../NavBarComponent/NavBar.component";

const NavbarWrapper = () => {
  return (
    <div>
      <NavBarComponent />
      <Outlet />
    </div>
  );
};

export default NavbarWrapper;
