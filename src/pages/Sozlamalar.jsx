import { useState } from 'react';

function Sozlamalar() {
  const [settings, setSettings] = useState({
    saytNomi: 'Master CRM',
    vaqtMintaqasi: 'Asia/Tashkent',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saqlangan sozlamalar:', settings);
    alert('Sozlamalar saqlandi!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sayt Sozlamalari</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Sayt Nomi:</label>
        <input name="saytNomi" value={settings.saytNomi} onChange={handleChange} className="w-full p-2 border mb-4" />
        <label className="block mb-2">Vaqt Mintaqasi:</label>
        <input name="vaqtMintaqasi" value={settings.vaqtMintaqasi} onChange={handleChange} className="w-full p-2 border mb-4" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Saqlash</button>
      </form>
    </div>
  );
}

export default Sozlamalar;