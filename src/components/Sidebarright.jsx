
import Filterbyname from './Filterbyname';
import Filterbyprice from './Filterbyprice';
import Filterbyrating from './Filterbyrating';

function Sidebarright() {
  return (
    <div className="pl-10">
      <h3 className="text-lg font-semibold mb-4">Filter On Page</h3>
      <ul className="space-y-2">
        <Filterbyname></Filterbyname>
        <Filterbyrating></Filterbyrating>
        <Filterbyprice></Filterbyprice>
      </ul>
    </div>
  );
}

export default Sidebarright;
