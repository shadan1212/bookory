import Cart from "../models/cart.model.js";
import Book from "../models/book.model.js";

// get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate(
      "items.book",
      "title, image, price, author, genre"
    );

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart.", error: error.message });
  }
};

// add item to cart or update quantity
const addItemToCart = async (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  const userId = req.user._id;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required." });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart, create one and add the item
      cart = await Cart.create({
        user: userId,
        items: [{ book: bookId, quantity, price: book.price }],
      });
    } else {
      // Cart exists, check if item is already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
      );

      if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Item does not exist, add new item
        cart.items.push({ book: bookId, quantity, price: book.price });
      }
      await cart.save();
    }

    await cart.populate("items.book", "title image price author genre");

    res.status(200).json({ message: "Item added to cart.", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart.", error: error.message });
  }
};

// update item quantity
const updateItemQuantity = async (req, res) => {
  const { bookId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1." });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      await cart.populate("items.book", "title image price author genre");
      res.status(200).json({ message: "Cart updated.", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart.", error: error.message });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.items = cart.items.filter((item) => item.book.toString() !== bookId);
    await cart.save();
    await cart.populate("items.book", "title image price author genre");

    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error removing item from cart.",
      error: error.message,
    });
  }
};

// Clear the entire cart
const clearCart = async (req, res) => {
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      await cart.save();
      res.status(200).json({ message: "Cart cleared successfully.", cart });
    } else {
      // If no cart, effectively it's already cleared
      res.status(200).json({
        message: "Cart is already empty.",
        cart: { user: userId, items: [] },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart.", error: error.message });
  }
};

export default {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
};
