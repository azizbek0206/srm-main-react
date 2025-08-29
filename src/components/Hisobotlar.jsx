function Hisobotlar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hisobotlar <span className="text-gray-500">Asia/Tashkent</span></h1>
      <p>Bu yerda hisobotlar ko‘rsatilishi mumkin (masalan, grafiklar yoki jadval).</p>
      <table className="w-full bg-white border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Hisobot turi</th>
            <th className="p-2">Sana</th>
            <th className="p-2">Miqdor</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Oylik daromad</td>
            <td className="p-2">2025-08-27</td>
            <td className="p-2">15,000,000 so‘m</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">O‘quvchilar statistikasi</td>
            <td className="p-2">2025-08-27</td>
            <td className="p-2">120 ta</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Hisobotlar;