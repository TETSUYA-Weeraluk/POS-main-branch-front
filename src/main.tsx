import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./i18n.ts";
import AuthProvider from "./config/authProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);
