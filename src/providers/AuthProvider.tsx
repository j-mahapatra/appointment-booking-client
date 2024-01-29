import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}>({
  user: undefined,
  setUser: () => {},
});

type UserType = {
  id: string;
  email: string;
  role: string;
  free_slots?: unknown;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
