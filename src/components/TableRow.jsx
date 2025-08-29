import React from 'react';

function TableRow({ name, price, duration, status, onEdit, onDelete }) {
  return (
    <tr>
      <td className="p-2 border">{name}</td>
      <td className="p-2 border">{price}</td>
      <td className="p-2 border">{duration}</td>
      <td className="p-2 border">{status}</td>
      <td className="p-2 border">
        <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
          Tahrirlash
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">
          O‘chirish
        </button>
      </td>
    </tr>
  );
}

export default TableRow;