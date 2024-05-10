import { create } from "zustand";
import { shallow } from "zustand/shallow";

type CartStore = {
  modalOpened: boolean;
  toggleModalOpened: () => void;
  closeModal: () => void; // New method to close the modal
};

const useCartModalStore = create<CartStore>((set) => ({
  modalOpened: false,
  toggleModalOpened: () =>
    set((state) => ({ modalOpened: !state.modalOpened })),
  closeModal: () => set({ modalOpened: false }), // Method to explicitly close the modal
}));

export const useModalOpen = () => useCartModalStore((state) => state.modalOpened);
export const useToggleCartModalOpen = () => useCartModalStore((state) => state.toggleModalOpened);
export const useToggleCartModalClose = () => useCartModalStore((state) => state.closeModal);
export const useCartModal = () => useCartModalStore((state) => [state.modalOpened, state.toggleModalOpened] as const, shallow);