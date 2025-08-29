import { useState, useEffect } from 'react';

function Davomat() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // O‘quvchilarni va davomatni backenddan olish
  useEffect(() => {
    // O‘quvchilarni olish
    fetch('http://192.168.100.11:8000/api/oquvchilar/')
      .then((response) => {
        if (!response.ok) throw new Error('O‘quvchilarni yuklashda xatolik');
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        const initialAttendance = {};
        data.forEach((student) => {
          initialAttendance[student.id] = { ...student, attended: false };
        });
        setAttendance(initialAttendance);
      })
      .catch((error) => setError('Xatolik: ' + error.message));

    // Davomat ma’lumotlarini olish
    fetch(`http://192.168.100.11:8000/api/davomat/?sana=${selectedDate}`)
      .then((response) => {
        if (!response.ok) throw new Error('Davomatni yuklashda xatolik');
        return response.json();
      })
      .then((data) => {
        const updatedAttendance = { ...attendance };
        data.forEach((record) => {
          if (record.oquvchi && updatedAttendance[record.oquvchi.id]) {
            updatedAttendance[record.oquvchi.id].attended = record.attended;
          }
        });
        setAttendance(updatedAttendance);
      })
      .catch((error) => setError('Xatolik: ' + error.message));
  }, [selectedDate]);

  // Davomatni yangilash
  const handleAttendanceChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], attended: !prev[id].attended },
    }));
  };

  // Davomatni backendga saqlash
  const handleSaveAttendance = async () => {
    try {
      const attendanceRecords = Object.values(attendance).map((student) => ({
        oquvchi_id: student.id,
        sana: selectedDate,
        attended: student.attended,
        guruh: student.guruh || '',
        uqituvchi: student.uqituvchi || '',
      }));

      for (const record of attendanceRecords) {
        // Mavjud davomat yozuvini tekshirish
        const existingRecord = await fetch(
          `http://192.168.100.11:8000/api/davomat/?oquvchi_id=${record.oquvchi_id}&sana=${record.sana}`
        );
        const existingData = await existingRecord.json();

        if (existingData.length > 0) {
          // Agar yozuv mavjud bo‘lsa, yangilash (PUT)
          const response = await fetch(`http://192.168.100.11:8000/api/davomat/${existingData[0].id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
          });
          if (!response.ok) throw new Error('Davomatni yangilashda xatolik');
        } else {
          // Yangi yozuv qo‘shish (POST)
          const response = await fetch('http://192.168.100.11:8000/api/davomat/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
          });
          if (!response.ok) throw new Error('Davomatni saqlashda xatolik');
        }
      }
      alert('Davomat muvaffaqiyatli saqlandi!');
      setError('');
    } catch (error) {
      setError('Davomatni saqlashda xatolik: ' + error.message);
    }
  };

  // Sana o‘zgartirish
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Davomat <span className="text-gray-500">Asia/Tashkent</span></h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2">Sana</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full p-2 border rounded"
        />
      </div>

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
              <td className="p-2">{student.kurs?.name || '-'}</td>
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