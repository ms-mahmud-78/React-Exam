import { useContext } from "react";
import { ContextData } from "../context";

function Filterbyname({ onSortByName }) {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  // Sorting books by name alphabetically
  const handleSortByName = () => {
    const sortedBooks = [...bookData].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredBooks(sortedBooks);
  };

  return (
    <div>
      <button
        className="cursor-pointer hover:text-[#00D991]"
        onClick={handleSortByName} // Button click triggers sorting
      >
        By name
      </button>
    </div>
  );
}

export default Filterbyname;
