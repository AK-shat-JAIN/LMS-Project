import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


function RequireAuth({ allowedRoles }){

    const { isLoggedIn, role } = useSelector((state) => state?.auth);
    const location = useLocation();

    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? ( <Navigate to="/denied" /> ) : ( <Navigate to="/login" state={{from: location.pathname}} /> )
}

export default RequireAuth;