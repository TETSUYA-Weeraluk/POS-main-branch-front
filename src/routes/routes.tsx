import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
import Order from "../pages/order/Order";
import ListOrders from "../pages/list-orders/ListOrders";
import HistoryPage from "../pages/history/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/list-orders",
        element: <ListOrders />,
      },
      {
        path: "/history-orders",
        element: <HistoryPage />,
      },
    ],
  },
]);

export default router;
