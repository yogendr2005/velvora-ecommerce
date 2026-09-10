import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routerConstants";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;