import { create } from "zustand";
import axios from "axios";

const APP_URL = "http://localhost:5000/api/user";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  // Initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  // Functions
  signup: async (username, email, password) => {
    set({ isLoading: true, message: null });
    try {
      const response = await axios.post(`${APP_URL}/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up.",
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${APP_URL}/login`, {
        email,
        password,
      });

      const { user, message } = response.data;
      set({ user, isLoading: false, message });
      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error in login.",
      });
      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });

    try {
      const response = await axios.get(`${APP_URL}/fetch-user`);

      set({ user: response.data, fetchingUser: false });
    } catch (error) {
      set({
        error: null,
        fetchingUser: false,
        user: null,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${APP_URL}/logout`);
      const { message } = response.data;

      set({ message, isLoading: false, error: null, user: null });

      return { message };
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });

      throw error;
    }
  },

  // update-profile
  updateProfile: async (updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${APP_URL}/update-profile`, updateData);

      set({
        user: response.data.user,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in Updating Profile",
        isLoading: false,
      });

      throw error;
    }
  },
}));
