import { createContext, useState, useContext, useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie"

import Loading from "../components/Loading/Loading";
import api from "../services/index";


type AuthContextType = {
  isAuthenticated?: boolean;
  user?: { [key: string]: any } | null;
  isLoading?: boolean;
  login?: (email: string, password: string) => void;
  logout?: () => void;
}


const AuthContext = createContext<AuthContextType>({});


export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      
      if (token) {
        api.defaults.headers.Authorization = `JWT ${token}`;
        const { data: user } = await api.get("/v1/me");
        if (user) setUser(user);
      }
      
      setIsLoading(false);
    }
    
    // loadUserFromCookies();
  }, [])
  
  
  // Methods
  const login = async (email: string, password: string) => {
    const { data: token } = await api.post("/auth/login", { email, password });
    
    if (token) {
      Cookies.set("token", token, { expires: 60 });
      api.defaults.headers.Authorization = `JWT ${token.token}`;
      const { data: user } = await api.get("/v1/me");
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

// HOC for private pages
export const withPrivateRoute = (Component: React.FC) => {
  return function WrappedWithProtectedRoute(props: { [key: string]: any }) {
    const { isAuthenticated, isLoading } = useAuth();
    
    console.log(isLoading, isAuthenticated)
    
    if (isLoading) return <Loading/>;
    if (!isAuthenticated) {
      Router.replace("/login");
      
      return null;
    }
    
    return <Component {...props}/>
  }
}
