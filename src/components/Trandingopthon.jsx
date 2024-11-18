import { AiOutlineFire } from "react-icons/ai";
import { useContext } from "react";
import { ContextData } from "../context";

function Trandingopthon() {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  const handleTrendingClick = () => {
    const trendingBooks = bookData.filter((book) => book.rating === 5); // Filter by rating
    setFilteredBooks(trendingBooks);
  };

  return (
    <div>
      <li
        onClick={handleTrendingClick}
        className="flex items-center pl-2 space-x-2 cursor-pointer hover:bg-[#00D991] hover:text-black rounded-md py-2"
      >
        <span>
          <AiOutlineFire />
        </span>
        <span>Trending</span>
      </li>
    </div>
  );
}

export default Trandingopthon;
