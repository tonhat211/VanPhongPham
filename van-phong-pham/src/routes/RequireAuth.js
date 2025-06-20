// components/RequireAuth.js
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function RequireAuth({ allowedPermissions,children  }) {
    const { user, permissions } = useAuth();

    useEffect(() => {
        console.log('RequireAuth: ' + JSON.stringify(permissions, null, 2));
    }, [permissions]);
    const location = useLocation();

    // Chưa đăng nhập → chuyển về /login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const ok =
        !allowedPermissions || // route KHÔNG yêu cầu quyền
        allowedPermissions.some((p) => permissions.includes(p));
    if (!ok) return <Navigate to="/403" replace />;

    // Có đăng nhập nhưng không đủ vai trò
    // if (allowedPermissions && !permissions.includes(allowedPermissions)) {
    //     return <Navigate to="/403" replace />;
    // }

    // Hợp lệ → hiển thị route con
    return children || <Outlet />;
}
