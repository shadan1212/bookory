import { create } from "zustand";
import axios from "axios";
import { useOrderStore } from "./orderStore";

const API_URL = "http://localhost:5000/api/cart";
axios.defaults.withCredentials = true;

export const useCartStore = create((set, get) => ({
  // Initial states:
  cart: null, // Will hold the cart object { _id, user, items: [...] }
  isLoading: false,
  error: null,
  message: null,

  // functions:

  // fetch the cart
  fetchCart: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(API_URL);

      set({ cart: response.data.cart, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error fetching cart.",
      });
      throw error;
    }
  },

  // add item to cart
  addItemToCart: async (id, quantity = 1) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/add`, { id, quantity });

      set({
        cart: response.data.cart,
        message: response.data.message,
        isLoading: false,
      });

      return { success: true, cart: response.data.cart };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error adding to cart.",
      });
      throw error;
    }
  },

  // Update quantity
  updateItemQuantity: async (id, quantity) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, {
        quantity,
      });
      set({
        cart: response.data.cart,
        message: response.data.message,
        isLoading: false,
      });
      return { success: true, cart: response.data.cart };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error updating quantity.",
      });
      throw error;
    }
  },

  // Remove item from the cart.
  removeItemFromCart: async (id) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.delete(`${API_URL}/remove/${id}`);
      set({
        cart: response.data.cart,
        message: response.data.message,
        isLoading: false,
      });
      return { success: true, cart: response.data.cart };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error removing item.",
      });
      throw error;
    }
  },

  // clear cart
  clearCartApi: async () => {
    // Renamed to avoid conflict with local clearCart
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.delete(`${API_URL}/clear`);
      set({
        cart: response.data.cart, // cart will be empty
        message: response.data.message,
        isLoading: false,
      });
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error clear cart.",
      });
      throw error;
    }
  },

  // Local clear cart (e.g., on logout or after successful order)
  clearCartLocal: () => {
    set({ cart: { items: [] }, message: "Cart cleared locally." });
  },

  // checkout function
  checkout: async (address, paymentInfo) => {
    set({ isLoading: true, error: null, message: null });

    const { cart } = get();
    const { placeOrder } = useOrderStore.getState();

    if (!cart || !cart.items || cart.items.length === 0) {
      set({ error: "Your cart is empty.", isLoading: false });
      return { success: false, error: "Your cart is empty." };
    }

    const orderItems = cart.items.map((item) => ({
      book: item.book._id, // Send only book ID
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      address,
      paymentInfo,
    };

    try {
      const orderResult = await placeOrder(orderData); // Call from OrderStore
      if (orderResult && orderResult.order) {
        // Check if order placement was successful
        set({
          message: "Checkout successful! Order placed.",
          isLoading: false,
        });
        // Clear the cart on successful order
        await get().clearCartApi(); // Call the API to clear cart on backend
        return { success: true, order: orderResult.order };
      } else {
        // placeOrder itself might throw or return an error structure
        const orderError =
          orderResult?.error || "Failed to place order during checkout.";
        set({ error: orderError, isLoading: false });
        return { success: false, error: orderError };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Checkout failed.";
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));
