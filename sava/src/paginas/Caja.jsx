import { useState } from 'react';

function Caja() {
  const [ticketId, setTicketId] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [total, setTotal] = useState(0);

  const handleValidateTicket = async () => {
    setErrorMessage('');
    setTicketInfo(null);

    try {
      const response = await fetch('http://localhost:5101/api/tickets/validar-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      setTicketInfo(data.ticket);
      setTotal((prevTotal) => prevTotal + parseInt(data.ticket.precio, 10));
    } catch (error) {
      setErrorMessage('Error al validar el ticket');
    }
  };

  const handleConsumeTicket = async () => {
    try {
      const response = await fetch('http://localhost:5101/api/tickets/consumir-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      alert('Ticket consumido exitosamente');
      setTicketInfo(null);
      setTicketId('');
    } catch (error) {
      setErrorMessage('Error al consumir el ticket');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Caja Registradora</h1>
      <div className="bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="ID del Ticket"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={handleValidateTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            Validar Ticket
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {ticketInfo && (
          <div className="mb-4 p-4 bg-gray-200 rounded">
            <p><strong>Nombre:</strong> {ticketInfo.nombre}</p>
            <p><strong>Contenido:</strong> {ticketInfo.contenido}</p>
            <p><strong>Precio:</strong> ${parseInt(ticketInfo.precio, 10)}</p>
            <button
              onClick={handleConsumeTicket}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 mt-2"
            >
              Consumir Ticket
            </button>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total: ${Math.round(total)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Caja;
