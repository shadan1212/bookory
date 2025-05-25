import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create((set) => ({
  // Initial states:
  order: null, // for single order
  orders: [], // for a list of orders
  isLoading: false,
  error: null,
  message: null,

  // Functions:
  placeOrder: async (orderData) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/create-order`, orderData);
      const { message, order } = response.data;

      set((state) => ({
        order, // Optionally set the newly created order as the current 'order'
        orders: [order, ...state.orders], // Add to the beginning of the orders list
        message,
        isLoading: false,
      }));

      return { message, order };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error placing order.";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  fetchUserOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/user-orders`);
      console.log(response.data.orders);
      set({ orders: response.data.orders, isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching user orders.";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  fetchOrderById: async (id) => {
    set({ isLoading: true, error: null, order: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({ order: response.data.order, isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching order details.";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },
}));
