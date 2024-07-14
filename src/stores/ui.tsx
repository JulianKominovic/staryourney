import { create } from "zustand";

type UIStore = {
  sidebarOpen: boolean;
  toggleSidebarOpen: () => void;
};

const useUI = create<UIStore>((set) => ({
  sidebarOpen: true,
  toggleSidebarOpen: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useUI;
