import { create } from "zustand";

interface State {
  id: string | number;
  role: string;
  role_id: string | number;
  token: string;
}

interface UserState extends State {
  setToken: (token: string) => void;
  setData: (data: State) => void;
  reset: () => void;
}

const initialState: State = {
  id: 0,
  role: "",
  role_id: 0,
  token: "",
};

const useAlertStore = create<UserState>()((set) => ({
  ...initialState,
  setToken: (token) => set(() => ({ token })),
  setData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));

export default useAlertStore;
