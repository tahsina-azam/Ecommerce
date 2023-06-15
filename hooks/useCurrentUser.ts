import { User } from "@/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User;
  isLogged: boolean;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
};

const initialUserData: User = {
  name: "",
  email: "",
  role: "",
  address: "",
  userId: "",
  accountId: "",
  image: "",
  bank: {
    deposit: 0,
  },
};

const useCurrentUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUserData,
      isLogged: false,
      setCurrentUser: (user) => set({ user: user, isLogged: true }),
      clearCurrentUser: () => set({ user: initialUserData, isLogged: false }),
    }),
    {
      name: "currentUser",
    }
  )
);

export const useCurrentUser = () => useCurrentUserStore((state) => state.user);
export const useAuth = () => useCurrentUserStore((state) => state.isLogged);

export const useSetCurrentUser = () =>
  useCurrentUserStore((state) => state.setCurrentUser);

export const useClearCurrentUser = () =>
  useCurrentUserStore((state) => state.clearCurrentUser);
