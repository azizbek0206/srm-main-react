import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'azizbek0206' && password === 'az1zbek12345') {
      setIsLoggedIn(true);
    } else {
      alert('Login yoki parol xato!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="header bg-white p-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">Master CRM <span className="text-gray-500">Asia/Tashkent</span></h1>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Chiqish</button>
      ) : (
        <div className="flex items-center space-x-4">
          <form onSubmit={handleLogin} className="flex space-x-2">
            <input
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Kirish</button>
          </form>
          <Link to="/register" className="text-blue-500">Ro‘yxatdan o‘tish</Link>
        </div>
      )}
    </div>
  );
}

export default Header;