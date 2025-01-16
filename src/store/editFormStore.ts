import { create } from "zustand";

interface EditFormState {
  value: string;
  error: string;
}

interface EditFormActions {
  setValue: (value: string) => void;
  setError: (error: string) => void;
  resetForm: () => void;
}

export const useEditFormStore = create<EditFormState & EditFormActions>(
  (set) => ({
    value: "",
    error: "",
    setValue: (value) =>
      set(() => ({
        value,
      })),
    setError: (error) =>
      set(() => ({
        error,
      })),
    resetForm: () => set({ value: "", error: "" }),
  }),
);
