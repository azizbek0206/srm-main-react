import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar bg-gray-100 p-4 w-64 h-screen fixed">
      <h2 className="text-lg font-bold mb-4">Menyu</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-blue-500 text-white rounded"><Link to="/">Dashboard</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/kurslar">Kurslar</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/oquvchilar">O‘quvchilar</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/tolovlar">To‘lovlar</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/davomat">Davomat</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/imtihonlar">Imtihonlar</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/xabarlarni">Xabarlar (SMS)</Link></li>
        <li className="p-2 hover:bg-gray-200 rounded"><Link to="/sozlamalar">So‘zlamalar</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;