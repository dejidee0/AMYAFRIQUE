import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error";
import Home from "../page/Home";
import Root from "../page/Root";
import AllArt from "../page/AllArt";
import AddCraft from "../page/AddCraft";
import MyCraft from "../page/MyCraft";
import CartPage from "../page/MyCart";
import Login from "../page/Logged";
import Register from "../page/Register";
import PrivateRoute from "../private/PrivateRoute";
import MyCraftDetails from "../page/MyCraftDetails";
import ViewDetails from "../page/ViewDetails";
import SubCategory from "../page/SubCategory";
import Test from "../page/Test";
import About from "../page/About";
import Events from "../page/Events";
import PaymentSuccess from "../page/PaymentSucess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/subCa/:id",
        element: <SubCategory></SubCategory>,
      },
      {
        path: "/allArt",
        element: <AllArt></AllArt>,
      },
      {
        path: "/aboutUs",
        element: <About></About>,
      },
      {
        path: "/events",
        element: <Events></Events>,
      },
      {
        path: "/addCraft",
        element: (
          <PrivateRoute>
            <AddCraft></AddCraft>
          </PrivateRoute>
        ),
      },
      {
        path: "/view/:id",
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myCraft",
        element: (
          <PrivateRoute>
            <MyCraft></MyCraft>
          </PrivateRoute>
        ),
      },
      {
        path: "/craftDe/:id",
        element: (
          <PrivateRoute>
            <MyCraftDetails></MyCraftDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myCart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/test",
        element: <Test></Test>,
      },
      {
        path: "/checkout-success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

export default router;
