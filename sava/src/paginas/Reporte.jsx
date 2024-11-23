import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Reporte() {
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    const obtenerTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5101/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error al obtener los tickets:', error);
      }
    };

    obtenerTickets();
  }, []);

  // Filtrar tickets por la fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      const filtered = tickets.filter(ticket => 
        new Date(ticket.fecha).toISOString().split('T')[0] === selectedDate
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets); // Mostrar todos si no se selecciona fecha
    }
  }, [selectedDate, tickets]);

  // Agrupar tickets por tipo
  const agruparPorTipo = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.contenido] = acc[ticket.contenido] || { cantidad: 0, total: 0 };
      acc[ticket.contenido].cantidad += 1;
      acc[ticket.contenido].total += parseFloat(ticket.precio) || 0;
      return acc;
    }, {});
  };

  const resumen = agruparPorTipo(filteredTickets);
  const totalTickets = filteredTickets.length;
  const ingresoTotal = filteredTickets.reduce((acc, ticket) => acc + parseFloat(ticket.precio || 0), 0);

  // Exportar resumen a Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      Object.keys(resumen).map(tipo => ({
        'Tipo': tipo,
        'Cantidad': resumen[tipo].cantidad,
        'Total': `$${Math.round(resumen[tipo].total)}`
      }))
    );

    XLSX.utils.book_append_sheet(wb, ws, 'Resumen');
    XLSX.writeFile(wb, `reporte_${selectedDate || 'completo'}.xlsx`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reporte de Tickets</h1>
      <div className="bg-white shadow-md rounded p-6">

        {/* Filtro por Fecha */}
        <div className="mb-4 flex items-center">
          <label className="mr-2 font-bold">Fecha:</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            className="border px-2 py-1"
          />
        </div>

        {/* Resumen */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Resumen</h2>
          <p>Total de tickets vendidos: {totalTickets}</p>
          <p>Ingreso total: ${Math.round(ingresoTotal)}</p>
          <ul>
            {Object.keys(resumen).map((tipo, index) => (
              <li key={index}>
                <strong>{tipo}:</strong> {resumen[tipo].cantidad} tickets vendidos, Total: ${Math.round(resumen[tipo].total)}
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="text-right mb-4">
          <button 
            onClick={exportToExcel} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            Exportar Resumen
          </button>
        </div>

        {/* Tabla de Tickets Filtrados */}
        <table id="reporte-table" className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 font-extrabold text-white text-xl">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Contenido</th>
              <th className="border px-4 py-2">Detalles</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{ticket._id}</td>
                  <td className="border px-4 py-2">{ticket.nombre}</td>
                  <td className="border px-4 py-2">{ticket.contenido}</td>
                  <td className="border px-4 py-2">{ticket.detalles}</td>
                  <td className="border px-4 py-2">${ticket.precio}</td>
                  <td className="border px-4 py-2">{new Date(ticket.fecha).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border px-4 py-2 text-center">No hay tickets para la fecha seleccionada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reporte;
