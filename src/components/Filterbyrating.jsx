import { useContext } from "react";
import { ContextData } from "../context";

function Filterbyrating() {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  // Sorting books by rating in descending order (highest rating first)
  const handleSortByRating = () => {
    const sortedBooks = [...bookData].sort((a, b) => b.rating - a.rating);
    setFilteredBooks(sortedBooks);
  };

  return (
    <div>
      <li
        className="cursor-pointer hover:text-[#00D991]"
        onClick={handleSortByRating} // Button click triggers sorting
      >
        By rating
      </li>
    </div>
  );
}

export default Filterbyrating;
