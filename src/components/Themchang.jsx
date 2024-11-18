import React, { useState } from 'react';
import { IoSunny } from "react-icons/io5";


function Themchang() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return (
    <div>
      <button  onClick={toggleTheme} className="text-[#00D991] border border-[#00D991] p-2 bg-[#2EE0A533] rounded-lg">
        <IoSunny className="text-[20px]" />
      </button>
    </div>
  );
}

export default Themchang;
