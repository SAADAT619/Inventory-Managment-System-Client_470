import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AllProducts from "../pages/AllProducts/AllProducts";
import Cart from "../pages/Cart/Cart";
import CustomerOrders from "../pages/Dashboard/CustomerOrders/CustomerOrders";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import ManageCustomer from "../pages/Dashboard/ManageCustomer/ManageCustomer";
import ManageFeedback from "../pages/Dashboard/ManageFeedback/ManageFeedback";
import ManageOrder from "../pages/Dashboard/ManageOrder/ManageOrder";
import ManageProduct from "../pages/Dashboard/ManageProduct/ManageProduct";
import Feedback from "../pages/Feedback/Feedback";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import ResetPassword from "../pages/Login/ResetPassword/ResetPassword";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../routes/privateRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <Feedback></Feedback>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "reset-password",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/products",
        element: <ManageProduct></ManageProduct>,
      },
      {
        path: "/dashboard/orders",
        element: <ManageOrder></ManageOrder>,
      },
      {
        path: "/dashboard/customers",
        element: <ManageCustomer></ManageCustomer>,
      },
      {
        path: "/dashboard/feedbacks",
        element: <ManageFeedback></ManageFeedback>,
      },
      {
        path: "/dashboard/customer-orders",
        element: <CustomerOrders></CustomerOrders>,
      },
    ],
  },
]);
