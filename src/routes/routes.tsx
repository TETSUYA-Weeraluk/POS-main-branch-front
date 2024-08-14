import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/login/Login";
import RestaurantPage from "../pages/restaurant/Restaurant";
import RestaurantDetailPage from "../pages/restaurant-detail/RestaurantDetail";
import Branch from "../pages/branch/Branch";
import Order from "../pages/branch/order/Order";
import ListOrders from "../pages/branch/list-orders/ListOrders";
import HistoryPage from "../pages/branch/history/History";
import DashboardPage from "../pages/branch/dashboard/Dashboard";
import ProductPage from "../pages/branch/product/Product";
import EmployeePage from "../pages/branch/employee/Employee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <RestaurantPage />,
      },
      {
        path: "/restaurant/:idRestaurant",
        element: <RestaurantDetailPage />,
      },
      {
        path: "/branch/:idBranch",
        element: <Branch />,
        children: [
          {
            path: "/branch/:idBranch/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/branch/:idBranch/order",
            element: <Order />,
          },
          {
            path: "/branch/:idBranch/list-orders",
            element: <ListOrders />,
          },
          {
            path: "/branch/:idBranch/history-orders",
            element: <HistoryPage />,
          },
          {
            path: "/branch/:idBranch/product",
            element: <ProductPage />,
          },
          {
            path: "/branch/:idBranch/employee",
            element: <EmployeePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
