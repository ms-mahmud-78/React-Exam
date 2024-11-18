import { useContext } from "react";
import { ContextData } from "../context";

function Filterbyprice() {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  const handleFilterByPrice = () => {
    const filteredBooksByPrice = [...bookData].sort((a, b) => a.price - b.price);
    setFilteredBooks(filteredBooksByPrice);
  };

  return (
    <div>
      <li
        onClick={handleFilterByPrice}
        className="cursor-pointer hover:text-[#00D991]"
      >
        By price
      </li>
    </div>
  );
}

export default Filterbyprice;
