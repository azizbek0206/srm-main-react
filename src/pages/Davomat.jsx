import { useState, useEffect } from 'react';

function Davomat() {
  // localStorage dan o'quvchilarni olish
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      const studentList = JSON.parse(savedStudents);
      setStudents(studentList);

      // Har bir o'quvchi uchun davomat holatini boshlang'ich qiymat bilan to'ldirish
      const initialAttendance = {};
      studentList.forEach((student) => {
        initialAttendance[student.id] = { ...student, attended: false };
      });
      setAttendance(initialAttendance);
    }
  }, []);

  // Davomatni yangilash
  const handleAttendanceChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], attended: !prev[id].attended },
    }));
  };

  // Davomatni saqlash (localStorage ga)
  const handleSaveAttendance = () => {
    const updatedAttendance = Object.values(attendance).map((student) => ({
      ...student,
      attended: student.attended,
    }));
    localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
    alert('Davomat muvaffaqiyatli saqlandi!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Davomat <span className="text-gray-500">Asia/Tashkent</span></h1>

      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Ism</th>
            <th className="p-2">Familiya</th>
            <th className="p-2">Telefon</th>
            <th className="p-2">Kurs</th>
            <th className="p-2">Davomat</th>
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
                <input
                  type="checkbox"
                  checked={attendance[student.id]?.attended || false}
                  onChange={() => handleAttendanceChange(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSaveAttendance}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Davomatni saqlash
      </button>
    </div>
  );
}

export default Davomat;