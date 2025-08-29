function TableRow({ name, price, duration, status, onEdit, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-2">{name}</td>
      <td className="p-2">{price}</td>
      <td className="p-2">{duration}</td>
      <td className="p-2">{status}</td>
      <td className="p-2">
        <a href="#" onClick={onEdit} className="text-blue-500 mr-2">Tahrirlash</a>
        <a href="#" onClick={onDelete} className="text-red-500">O‘chirish</a>
      </td>
    </tr>
  );
}

export default TableRow;