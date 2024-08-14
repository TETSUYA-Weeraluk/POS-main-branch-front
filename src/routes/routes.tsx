import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
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
        path: "/restaurant/:idRestaurant",
        element: <RestaurantDetailPage />,
        children: [
          {
            path: "/restaurant/:idRestaurant/branch/:idBranch",
            element: <Home />,
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
