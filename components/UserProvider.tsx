"use client";

import { createContext, useContext, ReactNode } from "react";

/**
 * Read-only build: there is no auth or database. This provider keeps the
 * `useUser()` API that a few components still call, but always reports an
 * anonymous viewer with no edit permissions.
 */
interface UserState {
  isAdmin: boolean;
  isEditor: boolean;
}

const UserContext = createContext<UserState>({
  isAdmin: false,
  isEditor: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={{ isAdmin: false, isEditor: false }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
