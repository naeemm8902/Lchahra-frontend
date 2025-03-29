'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface LoginContextType {
  isLoggedIn: boolean;
  sideBarDisplay: boolean;
  login: () => void;
  logout: () => void;
  toggleSidebarDisplay: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [sideBarDisplay, setSideBarDisplay] = useState<boolean>(false);
  useEffect(() => {
    const user = sessionStorage.getItem('loginUser');
    console.log(user);
    if (!user) {
      logout();
    }
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const toggleSidebarDisplay = () => setSideBarDisplay(!sideBarDisplay);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        sideBarDisplay,
        toggleSidebarDisplay,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
