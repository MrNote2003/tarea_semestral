import { useState, useEffect } from 'react';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    nombre: '',
    contenido: 'Turno 1',
    detalles: 'Finanzas',
    precio: '4990',
  });

  const contenidoOptions = [
    { value: 'Turno 1', label: 'Desayuno + Almuerzo', precio: '4990' },
    { value: 'Turno 2', label: 'Once + Cena1', precio: '7990' },
    { value: 'Turno 3', label: 'Cena2 + Desayuno', precio: '5990' },
  ];

  const detallesOptions = [
    'Finanzas',
    'TI',
    'Administrador',
    'Logística',
    'Marketing',
  ];

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:5101/api/tickets');
      if (!response.ok) throw new Error('Error al obtener los tickets');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTicket = () => {
    setShowForm(true);
  };

  const handleContenidoChange = (e) => {
    const selectedTurno = contenidoOptions.find(option => option.value === e.target.value);
    setNewTicketData({
      ...newTicketData,
      contenido: selectedTurno.value,
      precio: selectedTurno.precio,
    });
  };

  const handleSaveTicket = async () => {
    try {
      const existingTickets = tickets.filter(ticket => ticket.nombre === newTicketData.nombre);
      if (existingTickets.length >= 2) {
        alert('No se pueden emitir más de 2 tickets por persona diarios.');
        return;
      }

      const currentDateTime = new Date().toISOString().replace('T', ' ').split('.')[0];
      const ticketWithDateTime = { ...newTicketData, fecha: currentDateTime };

      const response = await fetch('http://localhost:5101/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketWithDateTime),
      });

      if (!response.ok) throw new Error('Error al guardar el ticket');
      const data = await response.json();
      setTickets([...tickets, data]);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrintTicket = (ticket) => {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Imprimir Ticket</title>
      </head>
      <body>
        <h1>Ticket-ID: ${ticket._id}</h1>
        <h1>Nombre: ${ticket.nombre}</h1>
        <p><strong>Contenido:</strong> ${ticket.contenido}</p>
        <p><strong>Detalles:</strong> ${ticket.detalles}</p>
        <p><strong>Precio:</strong> ${ticket.precio}</p>
        <p><strong>Fecha:</strong> ${ticket.fecha}</p>
        <br>
        <button onclick="window.print()">Imprimir</button>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5101/api/tickets/${ticketId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar el ticket');
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tickets</h1>
      <div className="bg-white shadow-md rounded p-6">
        <div className="flex justify-between mb-4">
          <button onClick={handleAddTicket} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">
            Crear Ticket
          </button>
        </div>

        {showForm && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={newTicketData.nombre}
              onChange={(e) => setNewTicketData({ ...newTicketData, nombre: e.target.value })}
              className="border px-2 py-1 mr-2"
            />
            <select
              value={newTicketData.contenido}
              onChange={handleContenidoChange}
              className="border px-2 py-1 mr-2"
            >
              {contenidoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={newTicketData.detalles}
              onChange={(e) => setNewTicketData({ ...newTicketData, detalles: e.target.value })}
              className="border px-2 py-1 mr-2"
            >
              {detallesOptions.map((detalle) => (
                <option key={detalle} value={detalle}>
                  {detalle}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Precio"
              value={newTicketData.precio}
              readOnly
              className="border px-2 py-1 mr-2"
            />
            <button onClick={handleSaveTicket} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">
              Guardar Ticket
            </button>
          </div>
        )}

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Turno</th>
              <th className="border px-4 py-2">Departamento</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{ticket.nombre}</td>
                <td className="border px-4 py-2">{ticket.contenido}</td>
                <td className="border px-4 py-2">{ticket.detalles}</td>
                <td className="border px-4 py-2">{ticket.precio}</td>
                <td className="border px-4 py-2 flex justify-center items-center">
                  <button 
                    onClick={() => handlePrintTicket(ticket)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mr-2"
                  >
                    Imprimir
                  </button>
                  <button
                    onClick={() => handleDeleteTicket(ticket._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
