import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./routerConstants";

const AdminRoute = () => {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );
  

  const user = useSelector(
    (state) => state.auth.user
  );

  if (!isLoggedIn) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (user?.role !== "admin") {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
};

export default AdminRoute;