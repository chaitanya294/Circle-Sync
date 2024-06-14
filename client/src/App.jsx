import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Signup from "./pages/Authentication/signup.jsx"
import Signin from "./pages/Authentication/signin.jsx"
import Account from "./pages/Account/Account.jsx";
import Home from "./pages/Account/Home/Home.jsx"
import Insights from "./pages/Account/Insights/Insights.jsx";
import Info from "./pages/Account/Info.jsx";
import MyGroups from "./pages/Account/Groups/MyGroups.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./pages/Authentication/ProtectedRoute.jsx";
import IndividualGroup from "./pages/Account/Groups/IndividualGroup";
import './App.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Signin />,
    },
    {
      path: '/signup',
      element : <Signup/>
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/info',
          element: <Info />
        },
        {
          path: '/insights',
          element: <Insights />
        },
        {
          path: '/groups',
          element: <MyGroups />
        },
        {
          path : '/group',
          element: <IndividualGroup />
        }
      ]
    },
    {
      path: '*',
      element: <NotFoundPage/>
    }
  ]
);

function App() {
  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App
