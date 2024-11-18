import { useState, useRef, } from 'react';
import BookCard from './components/BookCard';
import Navber from './components/Navber';
import Sidebarright from './components/Sidebarright';
import Slaidberleft from './components/Slaidberleft';
import Serchoption from './components/Serchoption';
import { MdFavoriteBorder } from "react-icons/md";
import { data as getData } from '/src/data/data.js';
import { ContextData } from './context';
import Footer from './components/Footer';
import { MdOutlineFavorite } from "react-icons/md";


function App() {
  const [bookData, setBookData] = useState(getData());
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const bookRefs = useRef({});

  const handleSearch = query => {
    if (query) {
      const results = bookData.filter(book =>
        book.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  };

  const scrollToBook = bookId => {
    setIsModalOpen(false);
    const bookElement = bookRefs.current[bookId]?.current;
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };


  const contextValue = {
    bookData,
    setBookData,
    filteredBooks,
    setFilteredBooks,
    isModalOpen,
    setIsModalOpen,
    cartItems,
    setCartItems,
    favorites,
    setFavorites,
    showFavorites,
    setShowFavorites,
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <ContextData.Provider value={contextValue}>
        <Navber toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
          <div className="grid grid-cols-5 gap-1">
            <aside className="col-span-1 p-3 bg-white dark:bg-gray-800">
              <Slaidberleft onSearchClick={() => setIsModalOpen(true)} />
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="text-black dark:text-white hover:bg-[#00D991] dark:hover:text-black rounded-md py-2 pr-[150px]" // 150px padding
              >
                <span className={`${showFavorites ? 'font-normal' : 'font-normal'}`}>
                  {showFavorites ? <span className='flex items-center gap-2'><MdOutlineFavorite className='ml-2' /> Favorites</span> : <span className='flex items-center gap-2'><MdFavoriteBorder className='ml-2' /> Favorites</span>}
                </span>
              </button>
            </aside>

            <main className="col-span-3">
              <BookCard bookRefs={bookRefs} />
            </main>

            <aside className="col-span-1 p-5 pl-10 bg-white dark:bg-gray-800">
              <Sidebarright />
            </aside>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-[750px] h-[430px] relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-7 px-3 bg-white dark:bg-gray-800 rounded-lg right-1 text-red-500 text-3xl font-bold"
                >
                  &times;
                </button>
                <Serchoption onSearch={handleSearch} />
                <div className="mt-4 max-h-80 overflow-y-auto">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                      <div
                        key={book.id}
                        onClick={() => scrollToBook(book.id)}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <p className="text-black dark:text-white">{book.name}</p>
                        <p className="text-gray-700 dark:text-gray-400">{book.category}</p>
                        <p className="text-green-500">BDT: {book.price} TK</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-red-500 text-center text-lg">No item found</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </ContextData.Provider>
    </div>
  );
}

export default App;
