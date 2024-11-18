import { LiaShippingFastSolid } from "react-icons/lia";
import { useContext } from "react";
import { ContextData } from "../context";

function Comingsoon() {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  const handleComingSoonClick = () => {
    const comingSoonBooks = bookData.filter((book) => book.status === "coming_soon");
    setFilteredBooks(comingSoonBooks);
  };

  return (
    <div>
      <li
        onClick={handleComingSoonClick}
        className="flex items-center pl-2 space-x-2 cursor-pointer hover:bg-[#00D991] hover:text-black rounded-md py-2"
      >
        <span>
          <LiaShippingFastSolid />
        </span>
        <span>Coming Soon</span>
      </li>
    </div>
  );
}

export default Comingsoon;
