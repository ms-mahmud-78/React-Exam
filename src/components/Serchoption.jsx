

function Serchoption({ onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Type your favorite book name here ..."
        onKeyUp={e => onSearch(e.target.value)}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-300  placeholder-gray-500"
        autoFocus
      />
    </div>
  );
}

export default Serchoption;
