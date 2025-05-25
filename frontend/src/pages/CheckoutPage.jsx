import { Building2, MapPin } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
import toast from "react-hot-toast";

const SHIPPING_COST = 5.0;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { placeOrder, order, message, error, isLoading } = useOrderStore();

  const [buyNowItemFromState, setBuyNowItemFromState] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [address, setAddress] = useState({
    street: user?.street || "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // get the item and setBuyNowItemFromState to item.
  useEffect(() => {
    if (
      location.state &&
      location.state.orderItems &&
      location.state.orderItems.length === 1 &&
      location.state.isBuyNow
    ) {
      const item = location.state.orderItems[0];
      if (item && item.book) {
        // console.log(item);
        setBuyNowItemFromState(item);
        setQuantity(item.quantity || 1);
      } else {
        console.error(
          "CheckoutPage: Buy Now item or book details are missing in location state."
        );
        navigate("/");
      }
    } else {
      console.error(
        "CheckoutPage: No Buy Now item found in location state or not a Buy Now flow."
      );
      navigate("/");
    }
  }, [location.state, navigate]);

  // get the book details in currentItemDetails
  const currentItemDetails = useMemo(() => {
    if (!buyNowItemFromState || !buyNowItemFromState.book) return null;
    return {
      ...buyNowItemFromState.book,
      // unitPrice: parseFloat(buyNowItemFromState.price) || 0,
    };
  }, [buyNowItemFromState]);

  const subtotal = useMemo(() => {
    if (!currentItemDetails) return 0;
    return currentItemDetails.price * quantity;
  }, [currentItemDetails, quantity]);

  const totalAmount = useMemo(() => {
    return subtotal + SHIPPING_COST;
  }, [subtotal]);

  // useEffect(() => {
  //   if (order && order._id && message) {
  //     navigate(`/order-confirmation/${order._id}`, { replace: true });
  //   }
  // }, [order, message, navigate]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!buyNowItemFromState || !currentItemDetails) {
      console.error("Cannot place order: item details are missing.");
      return;
    }

    if (!address.street || !address.city || !address.zip || !address.country) {
      // Replace alert with better UI feedback using state if needed
      toast.error("Please fill in all address fields.");
      return;
    }

    const orderData = {
      items: [
        {
          book: currentItemDetails._id,
          quantity: quantity,
          price: currentItemDetails.unitPrice,
        },
      ],
      address: address,
      paymentInfo: {
        method: paymentMethod,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        status: "pending",
      },
    };

    await placeOrder(orderData);
    toast.success("Order placed successfully.");
    // navigate("/");
  };

  // console.log(user);
  // console.log(currentItemDetails);
  // console.log(buyNowItemFromState);

  return (
    <div className="mt-18 min-h-screen bg-cream-2 py-12 px-6 lg:px-30">
      <h1 className="font-playflair text-4xl text-center font-bold pl-2">
        Checkout
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Form to collect details */}
        <div className="w-full bg-white rounded-xl shadow border border-gray-200 p-8 mt-10 lg:w-2/3">
          <h1 className="font-playflair font-medium text-2xl border-b-1 border-b-gray-1 pb-3">
            Shipping Details
          </h1>
          <form onSubmit={handleSubmitOrder} className="mt-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Street Address</span>
                </div>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium">City</span>
                </div>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Zip Code</span>
                </div>
                <input
                  type="text"
                  name="zip"
                  value={address.zip}
                  onChange={handleAddressChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Country</span>
                </div>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
            </div>
            <h1 className="mt-6 font-playflair font-medium text-2xl border-b-1 border-b-gray-1 pb-3">
              Payment Method
            </h1>
            <div className="mt-3">
              <label className="block mb-2 font-medium text-gray-1">
                Select Method
              </label>
              <select
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            {error && (
              <p className="text-red-600 mb-4 text-sm p-3 bg-red-50 rounded-md border border-red-200">
                Error: {orderError}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-brown-1 rounded-lg text-center text-white font-medium cursor-pointer mt-8"
            >
              {isLoading
                ? "Placing Order..."
                : `Place Order & Pay $${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Details */}
        <div className="w-full bg-white rounded-xl shadow p-8 mt-10 lg:w-1/3">
          <h1 className="font-playflair font-medium text-2xl border-b-1 border-b-gray-1 pb-3 mb-4">
            Order Summary
          </h1>
          <div className="flex justify-between mb-8">
            <div className="flex">
              <img
                src={currentItemDetails?.image}
                alt={currentItemDetails?.title}
                className="w-18 h-auto mr-4 border border-gray-200 rounded object-cover" // object-cover ensures image ratio maintained
              />
              <div>
                <p className="font-semibold text-black">
                  {currentItemDetails?.title}
                </p>
                <p className="font-light text-gray-1">
                  {currentItemDetails?.author}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 bg-cream-2 text-black rounded-md hover:bg-cream-2/80 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-1 bg-cream-2 text-black rounded-md hover:bg-cream-2/80 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <p className="font-normal text-black mt-3">
              ${currentItemDetails?.price.toFixed(2)}
            </p>
          </div>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-1">Subtotal:</span>
              <span className="font-medium">${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-1">
                Shipping & Handling:
              </span>
              <span className="font-medium">{SHIPPING_COST?.toFixed(2)}</span>
            </div>
          </div>
          <hr className="my-4 border-gray-200" />
          <div className="flex justify-between font-medium text-xl mt-6">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
