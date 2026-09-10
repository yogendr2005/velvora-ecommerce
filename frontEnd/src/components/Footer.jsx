import { Link } from "react-router-dom";

import { ROUTES } from "../routes/routerConstants";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2>
            Velvora
          </h2>

          <p>
            Discover premium products with a seamless
            shopping experience.
          </p>

        </div>


        {/* Links */}

        <div className="footer-links">

          {/* Shop */}

          <div className="footer-column">

            <h4>
              Shop
            </h4>

            <Link to={ROUTES.SHOP}>
              All Products
            </Link>

            <Link
              to={`${ROUTES.SHOP}?type=new-arrivals`}
            >
              New Arrivals
            </Link>

            <Link
              to={`${ROUTES.SHOP}?type=best-sellers`}
            >
              Best Sellers
            </Link>

          </div>


          {/* Support */}

          <div className="footer-column">

            <h4>
              Support
            </h4>

            <Link to={ROUTES.SUPPORT}>
              Help Center
            </Link>

            <Link to={ROUTES.CONTACT}>
              Contact
            </Link>

            <Link to={ROUTES.SUPPORT}>
              Shipping
            </Link>

          </div>


          {/* Account */}

          <div className="footer-column">

            <h4>
              Account
            </h4>

            <Link to={ROUTES.LOGIN}>
              Login
            </Link>

            <Link to={ROUTES.REGISTER}>
              Register
            </Link>

            <Link to={ROUTES.PROFILE}>
              My Account
            </Link>

          </div>

        </div>

      </div>


      {/* Copyright */}

      <div className="footer-bottom">

        © 2026 Velvora. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;