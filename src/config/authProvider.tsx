import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import * as jwtDecode from "jwt-decode";
import { fetchUser } from "../store/authSlice";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken_] = useState(
    localStorage.getItem("token-pos") || null
  );

  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const setToken = (newToken: string) => {
    setToken_(newToken);
    localStorage.setItem("token-pos", newToken);
  };

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token-pos", token);
        try {
          if (!user.name) {
            const decoded = jwtDecode.jwtDecode(token) as { id: string };
            dispatch(fetchUser(decoded.id));
          }
        } catch (error) {
          console.log("error", error);
        }
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token-pos");
      }
    };

    getUser();
  }, [token, dispatch, user.name]);

  const contextValue = useMemo(
    () => ({ token, setToken, user }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
