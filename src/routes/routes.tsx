import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
import Order from "../pages/order/Order";

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
    ],
  },
]);

export default router;
