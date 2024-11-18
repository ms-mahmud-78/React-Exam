import { useContext, useState } from 'react';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

import { ContextData } from '../context';

function Cartoption() {
  const { setCartItems, cartItems } = useContext(ContextData);

  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const increaseQuantity = id => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = id => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } else {
      setShowSuccess(true);
      setCartItems([]); // Empty the cart
      setShowCart(false); // Close the cart modal on successful checkout
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="relative">
        <FaShoppingCart
          onClick={() => setShowCart(!showCart)}
          className="text-[37px] text-[#00D991] border border-[#00D991] p-2 bg-[#2EE0A533] rounded-lg cursor-pointer"
        />
        <span className="absolute -top-3 -right-3 bg-[#00D991] py-[3px] px-2 rounded-full text-[10px]">
          {cartItems.length}
        </span>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg w-3/4 max-w-3xl h-4/6 overflow-y-auto relative flex">
            <div className="flex-1">
              <h2 className="text-center text-xl font-bold mb-4 text-white">
                Your Carts
              </h2>
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(cartItems)}
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="flex items-center py-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-16 mr-3"
                        />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-gray-500">{item.genre}</p>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2  border-2 items-center rounded-sm font-bold txt-[15px] m-2"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2  border-2 items-center rounded-sm font-bold txt-[15px] m-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4">${item.price * item.quantity}</td>
                      <td>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#333] text-white p-4 rounded-lg ml-6 me-6 w-1/3 h-[270px]">
              <h3 className="font-bold mb-9 text-[25px]">Order Summary</h3>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-[#00D991]">Free</p>
              </div>
              <div className="flex justify-between font-bold mt-4 border-t border-gray-600 pt-2">
                <p>Total</p>
                <p>${totalAmount}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 bg-[#00D991] py-2 px-4 rounded-lg text-white w-full"
              >
                Checkout
              </button>
            </div>

            <button
              onClick={() => setShowCart(false)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-[#00D991] text-white py-2 px-4 rounded-md shadow-lg z-20">
          Checkout Successful!
        </div>
      )}

      {showError && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg z-20">
          We can't find any items in your cart!
        </div>
      )}
    </div>
  );
}

export default Cartoption;
