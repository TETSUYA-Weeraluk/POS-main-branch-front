import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
import Order from "../pages/order/Order";
import ListOrders from "../pages/list-orders/ListOrders";
import HistoryPage from "../pages/history/History";
import Login from "../pages/login/Login";
import RestaurantPage from "../pages/restaurant/Restaurant";
import RestaurantDetailPage from "../pages/restaurant-detail/RestaurantDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <RestaurantPage />,
      },
      {
        path: "/:idRestaurant",
        element: <RestaurantDetailPage />,
        children: [
          {
            path: "/:idRestaurant/:idBranch",
            element: <Home />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <DefaultLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //     {
  //       path: "/order",
  //       element: <Order />,
  //     },
  //     {
  //       path: "/list-orders",
  //       element: <ListOrders />,
  //     },
  //     {
  //       path: "/history-orders",
  //       element: <HistoryPage />,
  //     },
  //   ],
  // },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
