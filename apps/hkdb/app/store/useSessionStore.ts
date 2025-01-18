import { create } from 'zustand';

interface State {
  id: string | number;
  name: string;
  token: string;
  isDark: boolean;
}

interface UserState extends State {
  setToken: (token: string) => void;
  setIsDark: (isDark: boolean) => void;
  setData: (data: State) => void;
  reset: () => void;
}

const initialState: State = {
  id: 0,
  name: '',
  token: '',
  isDark: false,
};

const useSessionStore = create<UserState>()((set) => ({
  ...initialState,
  setToken: (token) => set(() => ({ token })),
  setData: (data) => set((state) => ({ ...state, ...data })),
  setIsDark: (isDark) => set(() => ({ isDark })),
  reset: () => set(initialState),
}));

export { useSessionStore };
