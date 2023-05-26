// navigation
import { Outlet, Link } from "react-router-dom";

// helpers
import { Fragment } from "react";

// components
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// styles
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
