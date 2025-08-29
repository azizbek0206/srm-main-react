import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    email: '',
    username: '',
    parol: '',
    parolTasdiqlash: '',
    turi: 'oquvchi',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.parol !== formData.parolTasdiqlash) {
      alert('Parollar mos kelmaydi!');
      return;
    }
    // Real backendda saqlash kerak, hozircha konsolga chiqaramiz va login sahifasiga o'tkazamiz
    console.log('Registratsiya ma\'lumotlari:', formData);
    alert('Registratsiya muvaffaqiyatli! Endi kirishingiz mumkin.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ro‘yxatdan o‘tish</h1>
      <form onSubmit={handleSubmit}>
        <input name="ism" placeholder="Ism" value={formData.ism} onChange={handleChange} className="w-full p-2 border mb-4" />
        <input name="familiya" placeholder="Familiya" value={formData.familiya} onChange={handleChange} className="w-full p-2 border mb-4" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border mb-4" />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border mb-4" />
        <input name="parol" type="password" placeholder="Parol" value={formData.parol} onChange={handleChange} className="w-full p-2 border mb-4" />
        <input name="parolTasdiqlash" type="password" placeholder="Parolni tasdiqlash" value={formData.parolTasdiqlash} onChange={handleChange} className="w-full p-2 border mb-4" />
        <select name="turi" value={formData.turi} onChange={handleChange} className="w-full p-2 border mb-4">
          <option value="oquvchi">O‘quvchi</option>
          <option value="oqituvchi">O‘qituvchi</option>
          <option value="administrator">Administrator</option>
          <option value="hisobchi">Hisobchi</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Ro‘yxatdan o‘tish</button>
      </form>
    </div>
  );
}

export default Register;