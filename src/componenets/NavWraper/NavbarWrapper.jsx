import { Outlet } from "react-router-dom";
import NavBarComponent from "../NavBarComponent/NavBar.component";
import FooterComponent from "../footerComponent/Footer.component";

const NavbarWrapper = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default NavbarWrapper;
