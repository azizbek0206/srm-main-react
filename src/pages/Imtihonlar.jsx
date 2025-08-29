function Imtihonlar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Imtihon Natijalari</h1>
      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">O‘quvchi</th>
            <th className="p-2">Kurs</th>
            <th className="p-2">Ball</th>
            <th className="p-2">Sana</th>
            <th className="p-2">Amal</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Ali Valiyev</td>
            <td className="p-2">Python</td>
            <td className="p-2">85/100</td>
            <td className="p-2">2025-08-27</td>
            <td className="p-2"><a href="#" className="text-blue-500">Tahrirlash</a></td>
          </tr>
          {/* Qo'shimcha natijalar uchun ma'lumotlar qo'shing */}
        </tbody>
      </table>
    </div>
  );
}

export default Imtihonlar;