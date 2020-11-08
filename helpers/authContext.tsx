import { createContext, useState, useContext, useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie"

import Loading from "../components/Loading/Loading";
import api from "../services/index";
import { UserType } from "../types/general";


const GET_USER_ENDPOINT = "/user/1";
const LOGIN_USER_ENDPOINT = "/login";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {}
});


export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get current user by token on App start
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      
      if (token) {
        api.defaults.headers.Authorization = `JWT ${token}`;
        const { data: user } = await api.get(GET_USER_ENDPOINT);
        if (user) setUser(user);
      }
      
      setIsLoading(false);
    }
    
    loadUserFromCookies();
  }, [])
  
  
  // Methods
  const login = async (email: string, password: string) => {
    const { data: token } = await api.post(LOGIN_USER_ENDPOINT, { email, password });
    
    if (token) {
      Cookies.set("token", token, { expires: 60 });
      api.defaults.headers.Authorization = `JWT ${token.token}`;
      const { data: user } = await api.get(GET_USER_ENDPOINT);
      setUser(user);
    }
  }
  
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    Router.replace("/login");
  }
  
  
  // Render
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

// HOC for authorized users only
export const withPrivateRoute = (Component: React.FC) => {
  return function WrappedWithProtectedRoute(props: { [key: string]: any }) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) return <Loading/>;
    if (!isAuthenticated) {
      Router.replace("/login");
      
      return null;
    }
    
    return <Component {...props}/>
  }
}

// HOC for not authorized users only
export const withPublicRoute = (Component: React.FC) => {
  return function WrappedWithProtectedRoute(props: { [key: string]: any }) {
    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
      Router.replace("/");
      
      return null;
    }
    
    return <Component {...props}/>
  }
}
