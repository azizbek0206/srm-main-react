import { useState, useEffect } from 'react';

function Oquvchilar() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ ism: '', familiya: '', telefon: '', kurs: '' });

  // Ma'lumotlarni localStorage dan yuklash
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Ma'lumotlarni localStorage ga saqlash
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.ism && newStudent.familiya && newStudent.telefon && newStudent.kurs) {
      setStudents([...students, { id: Date.now(), ...newStudent }]);
      setNewStudent({ ism: '', familiya: '', telefon: '', kurs: '' });
      setShowForm(false);
    } else {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div>
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">O‘quvchilar <span className="text-gray-500">Asia/Tashkent</span></h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yangi o‘quvchi
        </button>
      </div>

      {showForm && (
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
            <label className="block mb-2">Telefon</label>
            <input
              type="text"
              name="telefon"
              value={newStudent.telefon}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="+998901234567"
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
            onClick={() => setShowForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Bekor qilish
          </button>
        </form>
      )}

      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Ism</th>
            <th className="p-2">Familiya</th>
            <th className="p-2">Telefon</th>
            <th className="p-2">Kurs</th>
            <th className="p-2">Amal</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="p-2">{student.ism}</td>
              <td className="p-2">{student.familiya}</td>
              <td className="p-2">{student.telefon}</td>
              <td className="p-2">{student.kurs}</td>
              <td className="p-2">
                <a href="#" className="text-blue-500 mr-2">Tahrirlash</a>
                <a href="#" onClick={() => handleDeleteStudent(student.id)} className="text-red-500">O‘chirish</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Oquvchilar;