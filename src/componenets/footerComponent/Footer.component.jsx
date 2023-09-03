import { Fragment } from "react";
import { useSelector } from "react-redux";

import footerCss from "./footerCss.css";

import {
  Envelope,
  GeoAlt,
  Github,
  Linkedin,
  Telephone,
} from "react-bootstrap-icons";


const FooterComponent = () => {
  const isLogin = useSelector((store) => store.auth.loggedIn);
  return (
    <footer
    // className={
    //   isLogin
    //     ? "text-center text-lg-start  footer bg-success "
    //     : "text-center text-lg-start   footer bg-danger  "
    // }
    >
      <section>
        <div className="text-center p-2">
          <div>
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              Tel aviv, shalom alichem 55, israel <GeoAlt />
            </p>
          </div>
          <div className="d-flex justify-content-around ">
            <p className="icons">
              <a
                href=" https://wa.me/+972548193664"
                target="_blank"
                rel="noreferrer"
                className="fas fa-phone me-3"
              >
                phone <Telephone />
              </a>
            </p>
            <p className="icons">
              <a
                href="mailto:ezrabn0@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                EMAIL <Envelope />
              </a>

            
            </p>
            <p className="icons">
              <a
                href="https://github.com/ezraben"
                target="_blank"
                rel="noreferrer"
                className="me-4 "
              >
              
                GITHUB <Github />
              </a>
            </p>
            <p className="icons">
              <a
                href="https://linkedin.com/in/ezra-ben-natan-8234a51a5"
                target="_blank"
                rel="noreferrer"
                className="me-4 "
              >
              
                LINKEDIN <Linkedin />
              </a>
            </p>
          </div>
        </div>
      </section>
  

      <div className="text-center p-4">© 2023 Copyright: EBN</div>
    </footer>
  );
};

export default FooterComponent;
