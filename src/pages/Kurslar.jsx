import { useState } from 'react';
import TableRow from '../components/TableRow';

function Kurslar() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Python', price: '500,000', duration: '3', status: 'Aktiv' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', price: '', duration: '', status: 'Aktiv' });
  const [editCourse, setEditCourse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse({ ...editCourse, [name]: value });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.name && newCourse.price && newCourse.duration) {
      setCourses([...courses, { id: Date.now(), ...newCourse }]);
      setNewCourse({ name: '', price: '', duration: '', status: 'Aktiv' });
      setShowForm(false);
    } else {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
    }
  };

  const handleEditCourse = (course) => {
    setEditForm(true);
    setEditCourse({ ...course });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editCourse.name && editCourse.price && editCourse.duration) {
      setCourses(courses.map((c) => (c.id === editCourse.id ? editCourse : c)));
      setEditForm(false);
      setEditCourse(null);
    } else {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
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
              placeholder="Masalan, 500,000"
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