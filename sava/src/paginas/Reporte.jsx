function Reporte() {
    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Reporte de Ventas</h1>
        <div className="bg-white shadow-md rounded p-6">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Venta</th>
                <th className="border px-4 py-2">Contenido</th>
                <th className="border px-4 py-2">Detalles</th>
                <th className="border px-4 py-2">Precio</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">TIPO 1</td>
                <td className="border px-4 py-2">Almuerzo + Bebida</td>
                <td className="border px-4 py-2">Para Funcionario</td>
                <td className="border px-4 py-2">$0</td>
                <td className="border px-4 py-2">$0</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">TIPO 2</td>
                <td className="border px-4 py-2">Almuerzo + Bebida</td>
                <td className="border px-4 py-2">Para Funcionario</td>
                <td className="border px-4 py-2">$0</td>
                <td className="border px-4 py-2">$0</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-right font-bold" colSpan="4">Total</td>
                <td className="border px-4 py-2">$0</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
              Exportar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Reporte;