import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Screenings from "../pages/Screenings.tsx"
import ScreeningForm from "../pages/ScreeningForm.tsx";
import Movies from "../pages/Movies.tsx"
import DataChange from "../pages/DataChange.tsx"
export const routes = [
    {
        path: "login",
        component: <Login/>,
        isPrivate: false
    },
    {
        path: "forgot",
        component: <ForgotPassword/>,
        isPrivate: false
    },
    {
        path: "dashboard",
        component: <Dashboard/>,
        isPrivate: true
    },
    {
        path: "screenings",
        component: <Screenings/>,
        isPrivate: true
    },
    {
        path: "screenings/create",
        component: <ScreeningForm isCreate={true}/>,
        isPrivate: true
    },
    {
        path: "screenings/:id",
        component: <ScreeningForm isCreate={false}/>,
        isPrivate: true
    },
    {
        path: "movies",
        component: <Movies/>,
        isPrivate: true
    },
    {
        path: "dataChange",
        component: <DataChange/>,
        isPrivate: true
    }
]