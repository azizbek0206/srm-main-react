import { useState } from 'react';

function Xabarlar() {
  const [message, setMessage] = useState('');

  const sendSMS = () => {
    // Bu yerda real SMS API chaqirilishi mumkin (masalan, Twilio yoki boshqa)
    alert(`SMS yuborildi: "${message}" kelmagan o'quvchiga. (Simulyatsiya)`);
    setMessage('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Xabarlar (SMS)</h1>
      <p>Kelmagan o‘quvchiga SMS yuborish:</p>
      <textarea 
        className="w-full p-2 border mb-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Xabar matni..."
      />
      <button onClick={sendSMS} className="bg-blue-500 text-white px-4 py-2 rounded">Yuborish</button>
    </div>
  );
}

export default Xabarlar;