import { LuFilePlus2 } from "react-icons/lu";
import { useContext } from "react";
import { ContextData } from "../context";

function Newreleses() {
  const { bookData, setFilteredBooks } = useContext(ContextData);

  const handleNewReleasesClick = () => {
    const newReleasesBooks = bookData.filter((book) => book.status === "new_releases");
    setFilteredBooks(newReleasesBooks);
  };

  return (
    <div>
      <li
        onClick={handleNewReleasesClick}
        className="flex items-center pl-2 space-x-2 cursor-pointer hover:bg-[#00D991] hover:text-black rounded-md py-2"
      >
        <span>
          <LuFilePlus2 />
        </span>
        <span>New Releases</span>
      </li>
    </div>
  );
}

export default Newreleses;
