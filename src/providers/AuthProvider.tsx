import { createContext, useState } from 'react';

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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
