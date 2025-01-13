import { create } from "zustand";

interface EditFormState {
  value: string;
}

interface EditFormActions {
  setValue: (value: string) => void;
}

export const useEditFormStore = create<EditFormState & EditFormActions>(
  (set) => ({
    value: "",
    setValue: (value) =>
      set(() => ({
        value,
      })),
  }),
);
