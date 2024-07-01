import { create } from "zustand";

interface State {
  open: boolean;
  header?: string | JSX.Element;
  desc?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onAction?: string | ((formData: FormData) => void) | undefined;
}

interface AlertState extends State {
  setOpen: (open: boolean) => void;
  setData: (data: State) => void;
  reset: () => void;
}

const initialState: State = {
  open: false,
  header: "Apa Kamu Yakin?",
  desc: "Perbuatan ini tidak dapat dikembalikan",
  cancelText: "Batal",
  confirmText: "Lanjutkan",
  onConfirm: undefined,
  onAction: undefined,
};

const useAlertStore = create<AlertState>()((set) => ({
  ...initialState,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));

export { useAlertStore };

export default useAlertStore;
