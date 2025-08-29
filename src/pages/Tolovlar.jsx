import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Tolovlar() {
  const [payments, setPayments] = useState([]);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [editPaymentForm, setEditPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({ uquvchi: '', miqdor: '', sana: '', holat: 'To‘langan' });
  const [editPayment, setEditPayment] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // To‘lovlarni backenddan olish
  useEffect(() => {
    fetch('http://192.168.100.11:8000/api/tulovlar/')
      .then((response) => {
        if (!response.ok) throw new Error('To‘lovlarni yuklashda xatolik');
        return response.json();
      })
      .then((data) => setPayments(data))
      .catch((error) => setError('Xatolik: ' + error.message));
  }, []);

  // Yangi to‘lov uchun inputlarni o‘zgartirish
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'miqdor') {
      if (!isNaN(value) && value !== '') {
        setNewPayment({ ...newPayment, [name]: parseInt(value) });
      } else {
        setNewPayment({ ...newPayment, [name]: '' });
      }
    } else {
      setNewPayment({ ...newPayment, [name]: value });
    }
  };

  // Tahrirlash uchun inputlarni o‘zgartirish
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'miqdor') {
      if (!isNaN(value) && value !== '') {
        setEditPayment({ ...editPayment, [name]: parseInt(value) });
      } else {
        setEditPayment({ ...editPayment, [name]: '' });
      }
    } else {
      setEditPayment({ ...editPayment, [name]: value });
    }
  };

  // Yangi to‘lov qo‘shish
  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (newPayment.uquvchi && newPayment.miqdor && newPayment.sana) {
      try {
        const response = await fetch('http://192.168.100.11:8000/api/tulovlar/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPayment),
        });
        if (!response.ok) throw new Error('To‘lov qo‘shishda xatolik');
        const data = await response.json();
        setPayments([...payments, data]);
        setNewPayment({ uquvchi: '', miqdor: '', sana: '', holat: 'To‘langan' });
        setShowAddPaymentForm(false);
        setError('');
      } catch (error) {
        setError('To‘lov qo‘shishda xatolik: ' + error.message);
      }
    } else {
      setError('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
    }
  };

  // Tahrirlashni boshlash
  const handleEditPayment = (payment) => {
    setEditPaymentForm(true);
    setEditPayment({ ...payment });
  };

  // Tahrirlangan to‘lovni saqlash
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (editPayment.uquvchi && editPayment.miqdor && editPayment.sana) {
      try {
        const response = await fetch(`http://192.168.100.11:8000/api/tulovlar/${editPayment.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editPayment),
        });
        if (!response.ok) throw new Error('Yangilashda xatolik');
        const updatedPayment = await response.json();
        setPayments(payments.map((p) => (p.id === updatedPayment.id ? updatedPayment : p)));
        setEditPaymentForm(false);
        setEditPayment(null);
        setError('');
      } catch (error) {
        setError('To‘lovni yangilashda xatolik: ' + error.message);
      }
    } else {
      setError('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
    }
  };

  // To‘lovni o‘chirish
  const handleDeletePayment = async (id) => {
    try {
      const response = await fetch(`http://192.168.100.11:8000/api/tulovlar/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('O‘chirishda xatolik');
      setPayments(payments.filter((p) => p.id !== id));
      setError('');
    } catch (error) {
      setError('To‘lovni o‘chirishda xatolik: ' + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">To‘lovlar <span className="text-gray-500">Asia/Tashkent</span></h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-6">
        <button
          onClick={() => setShowAddPaymentForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          To‘lov qilish
        </button>
      </div>

      {showAddPaymentForm && (
        <form onSubmit={handleAddPayment} className="mb-6 bg-white p-4 border rounded">
          <div className="mb-4">
            <label className="block mb-2">O‘quvchi</label>
            <input
              type="text"
              name="uquvchi"
              value={newPayment.uquvchi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="O‘quvchi ismi"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Miqdor</label>
            <input
              type="text"
              name="miqdor"
              value={newPayment.miqdor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Masalan, 500000"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Sana</label>
            <input
              type="date"
              name="sana"
              value={newPayment.sana}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Holat</label>
            <select
              name="holat"
              value={newPayment.holat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="To‘langan">To‘langan</option>
              <option value="Kutilmoqda">Kutilmoqda</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Saqlash
          </button>
          <button
            type="button"
            onClick={() => setShowAddPaymentForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Bekor qilish
          </button>
        </form>
      )}

      {editPaymentForm && editPayment && (
        <form onSubmit={handleSaveEdit} className="mb-6 bg-white p-4 border rounded">
          <div className="mb-4">
            <label className="block mb-2">O‘quvchi</label>
            <input
              type="text"
              name="uquvchi"
              value={editPayment.uquvchi}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Miqdor</label>
            <input
              type="text"
              name="miqdor"
              value={editPayment.miqdor}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Sana</label>
            <input
              type="date"
              name="sana"
              value={editPayment.sana}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Holat</label>
            <select
              name="holat"
              value={editPayment.holat}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="To‘langan">To‘langan</option>
              <option value="Kutilmoqda">Kutilmoqda</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Yangilash
          </button>
          <button
            type="button"
            onClick={() => setEditPaymentForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Bekor qilish
          </button>
        </form>
      )}

      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">O‘quvchi</th>
            <th className="p-2">Miqdor</th>
            <th className="p-2">Sana</th>
            <th className="p-2">Holat</th>
            <th className="p-2">Amal</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="p-2">{payment.uquvchi}</td>
              <td className="p-2">{payment.miqdor}</td>
              <td className="p-2">{payment.sana}</td>
              <td className="p-2">{payment.holat}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEditPayment(payment)}
                  className="text-blue-500 mr-2"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDeletePayment(payment.id)}
                  className="text-red-500"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tolovlar;