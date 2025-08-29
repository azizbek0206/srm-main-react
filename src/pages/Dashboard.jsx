import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // Statik statistika ma'lumotlari (real loyihada API dan olish mumkin)
  const stats = {
    kurslarSoni: 5,
    oquvchilarSoni: 120,
    tolganTolovlar: '15,000,000 so‘m',
    kelmaganOquvchilar: 8,
  };

  // So'nggi o'quvchilar ro'yxati (jadval uchun)
  const recentStudents = [
    { id: 1, ism: 'Ali', familiya: 'Valiyev', kurs: 'Python', sana: '2025-08-27' },
    { id: 2, ism: 'Nodira', familiya: 'Karimova', kurs: 'JavaScript', sana: '2025-08-26' },
    { id: 3, ism: 'Bobur', familiya: 'Mirzayev', kurs: 'Data Science', sana: '2025-08-25' },
  ];

  // Markaz rasmi URL (masalan, placeholder yoki haqiqiy rasm)
  const centerImage = 'https://via.placeholder.com/400x200?text=Markaz+Rasmi'; // Haqiqiy rasm URL ni qo'ying
  const navigate = useNavigate();

  // Yangi o'quvchi qo‘shish formasi uchun state
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ ism: '', familiya: '', kurs: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.ism && newStudent.familiya && newStudent.kurs) {
      alert(`Yangi o'quvchi qo'shildi: ${newStudent.ism} ${newStudent.familiya} (${newStudent.kurs})`);
      setNewStudent({ ism: '', familiya: '', kurs: '' });
      setShowAddStudentForm(false);
    } else {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard <span className="text-gray-500">Asia/Tashkent</span></h1>
      
      {/* Statistika kartalari */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Kurslar soni</h2>
          <p className="text-3xl font-bold">{stats.kurslarSoni}</p>
        </div>
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">O‘quvchilar soni</h2>
          <p className="text-3xl font-bold">{stats.oquvchilarSoni}</p>
        </div>
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">To‘langan to‘lovlar</h2>
          <p className="text-3xl font-bold">{stats.tolganTolovlar}</p>
        </div>
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Kelmagan o‘quvchilar</h2>
          <p className="text-3xl font-bold">{stats.kelmaganOquvchilar}</p>
        </div>
      </div>
      
      {/* Markaz rasmi */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Markaz Rasmi</h2>
        <img src={centerImage} alt="Markaz Rasmi" className="w-full max-w-md mx-auto rounded shadow" />
      </div>
      
      {/* So'nggi o'quvchilar jadvali */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">So‘nggi qo‘shilgan o‘quvchilar</h2>
        <table className="w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Ism</th>
              <th className="p-2">Familiya</th>
              <th className="p-2">Kurs</th>
              <th className="p-2">Qo‘shilgan sana</th>
            </tr>
          </thead>
          <tbody>
            {recentStudents.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.ism}</td>
                <td className="p-2">{student.familiya}</td>
                <td className="p-2">{student.kurs}</td>
                <td className="p-2">{student.sana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Yangi o'quvchi qo‘shish formasi */}
      {showAddStudentForm && (
        <form onSubmit={handleAddStudent} className="mb-6 bg-white p-4 border rounded">
          <div className="mb-4">
            <label className="block mb-2">Ism</label>
            <input
              type="text"
              name="ism"
              value={newStudent.ism}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ism"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Familiya</label>
            <input
              type="text"
              name="familiya"
              value={newStudent.familiya}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Familiya"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kurs</label>
            <input
              type="text"
              name="kurs"
              value={newStudent.kurs}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Kurs nomi"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Saqlash
          </button>
          <button
            type="button"
            onClick={() => setShowAddStudentForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Bekor qilish
          </button>
        </form>
      )}
      
      {/* Tez kirish tugmalari */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Tez Kirish</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddStudentForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Yangi o‘quvchi qo‘shish
          </button>
          <button
            onClick={() => navigate('/tolovlar')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            To‘lovga o‘tish
          </button>
          <button
            onClick={() => navigate('/hisobotlar')} // Hisobotlar sahifasi mavjud emas, keyin qo'shish mumkin
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Hisobot ko‘rish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;