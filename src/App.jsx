import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Kurslar from './pages/Kurslar';
import Oquvchilar from './pages/Oquvchilar';
import Tolovlar from './pages/Tolovlar';
import Davomat from './pages/Davomat';
import Imtihonlar from './pages/Imtihonlar';
import Xabarlar from './pages/Xabarlar';
import Sozlamalar from './pages/Sozlamalar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <div className="flex flex-1">
          <Sidebar />
          <div className="main-content flex-1 ml-64 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kurslar" element={<Kurslar />} />
              <Route path="/oquvchilar" element={<Oquvchilar />} />
              <Route path="/tolovlar" element={<Tolovlar />} />
              <Route path="/davomat" element={<Davomat />} />
              <Route path="/imtihonlar" element={<Imtihonlar />} />
              <Route path="/xabarlarni" element={<Xabarlar />} />
              <Route path="/sozlamalar" element={<Sozlamalar />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;