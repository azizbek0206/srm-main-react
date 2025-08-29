import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';

function Kurslar() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', price: '', duration: '', status: 'Aktiv' });
  const [editCourse, setEditCourse] = useState(null);
  const [error, setError] = useState('');

  // Kurslarni backenddan olish
  useEffect(() => {
    fetch('http://192.168.100.11:8000/api/kurslar/')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => setError('Kurslarni yuklashda xatolik: ' + error.message));
  }, []);

  // Input handler funksiyasi (newCourse uchun)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Price va duration uchun faqat sonlarni qabul qilish
    if (name === 'price' || name === 'duration') {
      if (!isNaN(value) && value !== '') {
        setNewCourse({ ...newCourse, [name]: parseInt(value) });
      } else {
        setNewCourse({ ...newCourse, [name]: '' });
      }
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  // Yangi kurs qo'shish
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (newCourse.name && newCourse.price && newCourse.duration) {
      try {
        const response = await fetch('http://192.168.100.11:8000/api/kurslar/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCourse),
        });
        if (!response.ok) throw new Error('Qo‘shishda xatolik');
        const data = await response.json();
        setCourses([...courses, data]);
        setNewCourse({ name: '', price: '', duration: '', status: 'Aktiv' });
        setShowForm(false);
        setError('');
      } catch (error) {
        setError('Kurs qo‘shishda xatolik: ' + error.message);
      }
    } else {
      setError('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
    }
  };

  // Tahrirlash uchun inputni o‘zgartirish
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'duration') {
      if (!isNaN(value) && value !== '') {
        setEditCourse({ ...editCourse, [name]: parseInt(value) });
      } else {
        setEditCourse({ ...editCourse, [name]: '' });
      }
    } else {
      setEditCourse({ ...editCourse, [name]: value });
    }
  };

  // Tahrirlashni boshlash
  const handleEditCourse = (course) => {
    setEditForm(true);
    setEditCourse({ ...course });
  };

  // Tahrirlangan kursni saqlash
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (editCourse.name && editCourse.price && editCourse.duration) {
      try {
        const response = await fetch(`http://192.168.100.11:8000/api/kurslar/${editCourse.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editCourse),
        });
        if (!response.ok) throw new Error('Yangilashda xatolik');
        const updatedCourse = await response.json();
        setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
        setEditForm(false);
        setEditCourse(null);
        setError('');
      } catch (error) {
        setError('Kursni yangilashda xatolik: ' + error.message);
      }
    } else {
      setError('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
    }
  };

  // Kursni o‘chirish
  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://192.168.100.11:8000/api/kurslar/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('O‘chirishda xatolik');
      setCourses(courses.filter((c) => c.id !== id));
      setError('');
    } catch (error) {
      setError('Kursni o‘chirishda xatolik: ' + error.message);
    }
  };

  return (
    <div>
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kurslar <span className="text-gray-500">Asia/Tashkent</span></h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yangi kurs
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {showForm && (
        <form onSubmit={handleAddCourse} className="mb-6 bg-white p-4 border rounded">
          <div className="mb-4">
            <label className="block mb-2">Nomi</label>
            <input
              type="text"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Kurs nomi"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Oyliq narx</label>
            <input
              type="text"
              name="price"
              value={newCourse.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Masalan, 500000"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Davomiyligi (oy)</label>
            <input
              type="text"
              name="duration"
              value={newCourse.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Masalan, 3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Holat</label>
            <select
              name="status"
              value={newCourse.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Aktiv">Aktiv</option>
              <option value="Passiv">Passiv</option>
            </select>
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
      {editForm && editCourse && (
        <form onSubmit={handleSaveEdit} className="mb-6 bg-white p-4 border rounded">
          <div className="mb-4">
            <label className="block mb-2">Nomi</label>
            <input
              type="text"
              name="name"
              value={editCourse.name}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Oyliq narx</label>
            <input
              type="text"
              name="price"
              value={editCourse.price}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Davomiyligi (oy)</label>
            <input
              type="text"
              name="duration"
              value={editCourse.duration}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Holat</label>
            <select
              name="status"
              value={editCourse.status}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Aktiv">Aktiv</option>
              <option value="Passiv">Passiv</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Yangilash
          </button>
          <button
            type="button"
            onClick={() => setEditForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Bekor qilish
          </button>
        </form>
      )}
      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nomi</th>
            <th className="p-2">Oyliq narx</th>
            <th className="p-2">Davomiyligi (oy)</th>
            <th className="p-2">Holat</th>
            <th className="p-2">Amal</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              name={course.name}
              price={course.price}
              duration={course.duration}
              status={course.status}
              onEdit={() => handleEditCourse(course)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Kurslar;