// Import Components
import Trandingopthon from './Trandingopthon';
import Newreleses from './Newreleses';
import Comingsoon from './Comingsoon';
import Favorites from './Favorites';
import { useState } from 'react';

function Slaidberleft({ onSearchClick }) {
  const [searchValue, setSearchValue] = useState('Quick search...');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="pt-2">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        onClick={onSearchClick}
        className="bg-white dark:text-gray-400 mb-4 dark:bg-slate-700 py-2 pr-9 pl-2 rounded-lg border border-green-400"
      />
      <ul className="space-y-4">
        <Trandingopthon />
        <Newreleses />
        <Comingsoon />
        <Favorites />
      </ul>
    </div>
  );
}

export default Slaidberleft;
