// src/store/useAuthStore.js
import { create } from "zustand";
import supabase from "../../supabase-client";

const useAuthStore = create((set) => ({
  user: null,
  session: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),

  fetchUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      set({ user: data.user });
    }
  },

  listenToAuthChanges: () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        set({ user: session.user, session });
      } else {
        set({ user: null, session: null });
      }
    });
    return subscription;
  },
}));

export default useAuthStore;
