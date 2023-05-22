import { create } from "zustand";
import { shallow } from "zustand/shallow";
type CartStore = {
  modalOpened: boolean;
  toggleModalOpened: () => void;
};

const useCartModalStore = create<CartStore>((set) => ({
  modalOpened: false,
  toggleModalOpened: () =>
    set((state) => ({ modalOpened: !state.modalOpened })),
}));

export const useModalOpen = () =>
  useCartModalStore((state) => state.modalOpened);
export const useToggleCartModalOpen = () =>
  useCartModalStore((state) => state.toggleModalOpened);
export const useCartModal = () =>
  useCartModalStore(
    (state) => [state.modalOpened, state.toggleModalOpened] as const,
    shallow
  );
