import { useState } from 'react';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'azizbek0206' && password === 'az1zbek12345',username==='ulugbek' && password==='ulugbek1277' ) {
      setIsLoggedIn(true);
    } else {
      alert('Login yoki parol xato!');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kirish</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border mb-4" />
        <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-4" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Kirish</button>
      </form>
    </div>
  );
}

export default Login;