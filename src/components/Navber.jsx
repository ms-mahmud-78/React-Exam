import Cartoption from './Cartoption';
import Notification from './Notification';
import Themchang from './Themchang';

function Navbar() {
  return (
    <nav className="border-b border-gray-400 flex items-center shadow-md sticky top-0 z-50 justify-between p-4 bg-white dark:bg-gray-800">
      <h1 className="text-green-500 text-2xl font-bold">DivineBook</h1>
      <div className="flex items-center space-x-4 mr-10">
        {/* Notification Icon */}
        <Notification />
        {/* Theme Toggle Icon */}
        <Themchang />
        {/* Cart Icon with Badge */}
        <Cartoption />
      </div>
    </nav>
  );
}

export default Navbar;
