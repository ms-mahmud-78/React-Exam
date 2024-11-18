import React, { useContext, useState, useRef, useEffect } from 'react';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { ContextData } from '../context';

function BookCard() {
  const {
    setCartItems,
    cartItems,
    bookData,
    filteredBooks,
    favorites,
    setFavorites,
    showFavorites,
  } = useContext(ContextData);
  const [selectedRatings, setSelectedRatings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const cartRefs = useRef({});
  const [lastAddedItemId, setLastAddedItemId] = useState(null);

  const handleRatingClick = (bookId, rating) => {
    setSelectedRatings(prevRatings => ({
      ...prevRatings,
      [bookId]: rating,
    }));
  };

  const toggleFavorite = book => {
    setFavorites(prevFavorites =>
      prevFavorites.some(fav => fav.id === book.id)
        ? prevFavorites.filter(fav => fav.id !== book.id)
        : [...prevFavorites, book]
    );
  };

  const openModal = book => {
    setModalData(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const addToCart = book => {
    const isAlreadyInCart = cartItems.some(item => item.id === book.id);
    if (!isAlreadyInCart) {
      setCartItems(prevItems => [
        ...prevItems,
        { ...book, quantity: 1, totalPrice: book.price },
      ]);
      setLastAddedItemId(book.id);
    }
  };

  useEffect(() => {
    if (lastAddedItemId && cartRefs.current[lastAddedItemId]) {
      cartRefs.current[lastAddedItemId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [cartItems, lastAddedItemId]);

  const booksToDisplay = showFavorites
    ? favorites
    : filteredBooks.length > 0
    ? filteredBooks
    : bookData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 flex flex-wrap">
      {booksToDisplay.map(book => {
        const isAlreadyInCart = cartItems.some(item => item.id === book.id);
        const isFavorited = favorites.some(fav => fav.id === book.id);

        return (
          <div key={book.id} className="col-span-4">
            <div className="bg-white dark:bg-gray-800 my-5 flex items-center w-full justify-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full border">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-200 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => openModal(book)}
                />
                <h3 className="text-[18px] font-semibold text-black dark:text-white mb-1">
                  {book.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">{book.genre}</p>

                <div className="flex items-center mb-1 space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleRatingClick(book.id, index + 1)}
                      className={`text-[30px] cursor-pointer ${
                        (selectedRatings[book.id] || book.rating) > index
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => addToCart(book)}
                    className={`px-5 py-3 rounded-lg text-black ${
                      isAlreadyInCart ? 'bg-red-600' : 'bg-[#00D991]'
                    }`}
                    disabled={isAlreadyInCart}
                  >
                    {isAlreadyInCart
                      ? 'Added to Cart'
                      : `$${book.price} | Add to Cart`}
                  </button>
                  <button
                    onClick={() => toggleFavorite(book)}
                    className="text-[45px] border rounded-lg"
                  >
                    {isFavorited ? (
                      <MdFavorite className="p-2 text-red-500" />
                    ) : (
                      <MdOutlineFavoriteBorder className="p-2" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal for Book Details */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-4 rounded-lg w-[750px] h-[430px] relative">
            <div className="flex">
              <img
                src={modalData.image}
                alt={modalData.name}
                className="w-1/3 h-auto rounded-lg mr-4"
              />
              <div className="text-white space-y-2">
                <h3 className="text-4xl font-semibold">{modalData.name}</h3>
                <p className="text-gray-400 text-[26px]">
                  {modalData.category}
                </p>

                <p className="text-[21px]">{modalData.description}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => addToCart(modalData)}
                    className={`px-6 py-2 rounded-lg text-black mt-4 ${
                      cartItems.some(item => item.id === modalData.id)
                        ? 'bg-red-600'
                        : 'bg-[#00D991]'
                    }`}
                    disabled={cartItems.some(item => item.id === modalData.id)}
                  >
                    {cartItems.some(item => item.id === modalData.id)
                      ? 'Added to Cart'
                      : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => toggleFavorite(modalData)}
                    className="text-[45px] border rounded-lg mt-4"
                  >
                    {favorites.some(fav => fav.id === modalData.id) ? (
                      <MdFavorite className="p-2 text-red-500" />
                    ) : (
                      <MdOutlineFavoriteBorder className="p-2" />
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="py-1 px-4 bg-red-600 rounded-lg text-black mt-4"
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookCard;
