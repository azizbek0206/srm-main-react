import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tolovlar() {
  const [payments, setPayments] = useState([
    { id: 1, oquvchi: 'Ali Valiyev', miqdor: '500,000', sana: '2025-08-27', holat: 'To‘langan' },
  ]);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({ oquvchi: '', miqdor: '', sana: '', holat: 'To‘langan' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (newPayment.oquvchi && newPayment.miqdor && newPayment.sana) {
      setPayments([...payments, { id: Date.now(), ...newPayment }]);
      setNewPayment({ oquvchi: '', miqdor: '', sana: '', holat: 'To‘langan' });
      setShowAddPaymentForm(false);
    } else {
      alert('Iltimos, barcha majburiy maydonlarni to‘ldiring!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">To‘lovlar <span className="text-gray-500">Asia/Tashkent</span></h1>
      
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
              name="oquvchi"
              value={newPayment.oquvchi}
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
              placeholder="Masalan, 500,000"
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
              <td className="p-2">{payment.oquvchi}</td>
              <td className="p-2">{payment.miqdor}</td>
              <td className="p-2">{payment.sana}</td>
              <td className="p-2">{payment.holat}</td>
              <td className="p-2">
                <a href="#" className="text-blue-500 mr-2">Tahrirlash</a>
                <a href="#" className="text-red-500">O‘chirish</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tolovlar;