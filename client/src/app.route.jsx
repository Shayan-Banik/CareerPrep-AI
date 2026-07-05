import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import PublicRoute from "./features/auth/components/PublicRoute";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <PublicRoute> <Login /> </PublicRoute> 
    },
    {
        path: '/register',
        element: <PublicRoute> <Register /> </PublicRoute> 
    },
    {
        path: '/',
        element: <Protected><Home /> </Protected>
    },
    {
        path: '/interview/:interviewId',
        element: <Protected><Interview /> </Protected>
    }
])