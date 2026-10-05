import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Support from "../pages/Support";

import { ROUTES } from "./routerConstants";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/Contact";
import AdminOrders from "../pages/AdminOrders";
import AdminActivity from "../pages/AdminActivity";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
          {
            path: ROUTES.SHOP,
            element: <Shop />,
          },
          {
            path: ROUTES.PRODUCT_DETAILS,
            element: <ProductDetails />,
          },
          {
            path: ROUTES.CART,
            element: <Cart />,
          },
          {
            path: ROUTES.CHECKOUT,
            element: <Checkout />,
          },
          {
            path: ROUTES.WISHLIST,
            element: <Wishlist />,
          },
          {
            path: ROUTES.PROFILE,
            element: <Profile />,
          },
          {
            element: <AdminRoute />,
            children: [
              {
                path: ROUTES.ADMIN_ORDERS,
                element: <AdminOrders />
              },
                            {
                path: ROUTES.ADMIN_ACTIVITY,
                element: <AdminActivity  />
              }
            ]
          },
          {
            path: ROUTES.SUPPORT,
            element: <Support />,
          },
          {
            path: ROUTES.CONTACT,
            element: <Contact />,
          },
        ],
      },
    ],
  },

  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },

  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);

export default router;