import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import { FaBagShopping } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import { fetchCategories } from "../store/slices/categorySlice";
import { ROUTES } from "../routes/routerConstants";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.categories.categories
  );

  const [searchValue, setSearchValue] = useState("");

  const totalItems = useSelector(
    (state) => state.cart.totalItems
  );

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const products = useSelector(
    (state) => state.products.products
  );

  // ===========================
  // FETCH CATEGORIES
  // ===========================

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ===========================
  // NAVIGATION ACTIVE STATE
  // ===========================

  const isStoreActive =
    location.pathname === ROUTES.SHOP &&
    !location.search;

  const isNewArrivalsActive =
    location.pathname === ROUTES.SHOP &&
    location.search === "?type=new-arrivals";

  const isBestSellersActive =
    location.pathname === ROUTES.SHOP &&
    location.search === "?type=best-sellers";

  // ===========================
  // SEARCH RESULTS
  // ===========================

  const searchResults =
    searchValue.trim() === ""
      ? []
      : products
          .filter((product) => {
            const searchText = searchValue
              .toLowerCase()
              .trim();

            return (
              product.name
                .toLowerCase()
                .includes(searchText) ||
              product.category
                .toLowerCase()
                .includes(searchText)
            );
          })
          .slice(0, 5);

  // ===========================
  // SEARCH CHANGE
  // ===========================

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // ===========================
  // SEARCH SUBMIT
  // ===========================

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const searchText = searchValue.trim();

    if (!searchText) {
      return;
    }

    navigate(
      `${ROUTES.SHOP}?search=${encodeURIComponent(
        searchText
      )}`
    );

    setSearchValue("");
  };

  // ===========================
  // PRODUCT CLICK
  // ===========================

  const handleProductClick = (product) => {
    setSearchValue("");
    navigate(`/product/${product._id}`);
  };

  // ===========================
  // VIEW ALL RESULTS
  // ===========================

  const handleViewAll = () => {
    const searchText = searchValue.trim();

    if (!searchText) {
      return;
    }

    navigate(
      `${ROUTES.SHOP}?search=${encodeURIComponent(
        searchText
      )}`
    );

    setSearchValue("");
  };

  // ===========================
  // LOGOUT
  // ===========================

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="navbar">

      {/* Logo */}

      <div className="logo">
        <Link to={ROUTES.HOME}>
          <FaBagShopping />
          <span>Velvora</span>
        </Link>
      </div>

      {/* Navigation */}

      <nav className="nav-links">

        <Link
          to={ROUTES.SHOP}
          className={
            isStoreActive ? "active" : ""
          }
        >
          Store
        </Link>

        <Link
          to={`${ROUTES.SHOP}?type=new-arrivals`}
          className={
            isNewArrivalsActive
              ? "active"
              : ""
          }
        >
          New Arrivals
        </Link>

        <Link
          to={`${ROUTES.SHOP}?type=best-sellers`}
          className={
            isBestSellersActive
              ? "active"
              : ""
          }
        >
          Best Sellers
        </Link>

        {/* Categories */}

        <div className="category-menu">
          <span className="category-menu-title">
            Categories
          </span>

          <div className="category-dropdown">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`${ROUTES.SHOP}?category=${encodeURIComponent(
                  category.name
                )}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to={ROUTES.SUPPORT}
          className={
            location.pathname === ROUTES.SUPPORT
              ? "active"
              : ""
          }
        >
          Support
        </Link>

      </nav>

      {/* Search */}

      <div className="search-wrapper">

        <form
          className="search-box"
          onSubmit={handleSearchSubmit}
        >
          <FaSearch />

          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products"
          />
        </form>

        {/* Search Suggestions */}

        {searchValue.trim() !== "" && (
          <div className="search-results">

            {searchResults.length > 0 ? (
              <>
                {searchResults.map((product) => (
                  <div
                    className="search-result-item"
                    key={product._id}
                    onClick={() =>
                      handleProductClick(product)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="search-result-info">
                      <h4>{product.name}</h4>

                      <p>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}

                {/* View All */}

                <button
                  className="view-all-results"
                  onClick={handleViewAll}
                >
                  View all results →
                </button>
              </>
            ) : (
              <div className="no-search-results">
                No products found
              </div>
            )}

          </div>
        )}

      </div>

      {/* Icons */}

      <div className="nav-icons">

        <Link to={ROUTES.WISHLIST}>
          <FaHeart />
        </Link>

        <Link
          to={ROUTES.CART}
          className="cart-icon"
        >
          <FaShoppingBag />

          <span>
            {totalItems}
          </span>
        </Link>

        {isLoggedIn ? (
          <>
            <Link to={ROUTES.PROFILE}>
              <FaUser />
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <FaUser />
          </Link>
        )}

      </div>

    </header>
  );
};

export default Navbar;