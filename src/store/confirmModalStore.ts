import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
}

interface ModalActions {
  handleVisibleModal: () => void;
}

export const useConfirmModalStore = create<ModalState & ModalActions>(
  (set) => ({
    isOpen: false,
    handleVisibleModal: () =>
      set((state) => ({
        isOpen: !state.isOpen,
      })),
  }),
);
