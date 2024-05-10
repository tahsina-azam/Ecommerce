import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
type CartStore = {
  modalOpened: boolean;
  toggleModalOpened: () => void;
  
};

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      modalOpened: false,
      toggleModalOpened: () =>
        set((state) => ({ modalOpened: !state.modalOpened })),
      toggleModalClosed: () =>
        set((state) => ({ modalOpened: state.modalOpened })),
    }),
    {
      name: "currentUser",
    }
  )
);

export const useModalOpen = () => useCartStore((state) => state.modalOpened);

export const useToggleCartModalOpen = () =>
  useCartStore((state) => state.toggleModalOpened);

export const useToggleCartModalClose = () =>
  useCartStore((state) => !state.toggleModalOpened);

export const useCartModal = () =>
  useCartStore(
    (state) => [state.modalOpened, state.toggleModalOpened] as const,
    shallow
  );
