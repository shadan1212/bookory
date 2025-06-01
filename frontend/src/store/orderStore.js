import { create } from "zustand";
import axios from "axios";

const API_URL = "https://bookory.onrender.com/api/order";
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

  fetchAdminOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/admin-orders`);
      set({ orders: response.data.orders, isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching admin orders.";
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

  updateOrderStatus: async (id, updateData) => {
    // updateData: { status: "shipped", paymentStatus: "completed", transactionId: "..." }
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.put(`${API_URL}/status/${id}`, updateData);
      const { message, order: updatedOrder } = response.data;

      set((state) => ({
        orders: state.orders.map((o) =>
          o._id === updatedOrder._id ? updatedOrder : o
        ),
        order:
          state.order?._id === updatedOrder._id ? updatedOrder : state.order,
        message,
        isLoading: false,
      }));
      return { message, order: updatedOrder };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating order status.";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  cancelOrder: async (orderId) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.put(`${API_URL}/cancel/${orderId}`);
      const { message, order: cancelledOrder } = response.data;

      set((state) => ({
        orders: state.orders.map((o) =>
          o._id === cancelledOrder._id ? cancelledOrder : o
        ),
        order:
          state.order?._id === cancelledOrder._id
            ? cancelledOrder
            : state.order,
        message,
        isLoading: false,
      }));
      return { success: true, message, order: cancelledOrder };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error cancelling order.";
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },
}));
