import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout';
import PagLogin from './paginas/Login';
import PagRegistro from './paginas/Registro';
import Dashboard from './paginas/Dashboard';
import Reporte from './paginas/Reporte';
import Usuarios from './paginas/Usuarios';
import Tickets from './paginas/Tickets';
import ProtectedRoute from './componentes/ProtectedRoute'; // Importa el componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para login y registro */}
        <Route path="/login" element={<PagLogin />} />
        <Route path="/registro" element={<PagRegistro />} />

        {/* Rutas protegidas con layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="tareas"
            element={
              <ProtectedRoute>
                <h1>Listado de Tareas</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="reportes"
            element={
              <ProtectedRoute>
                <Reporte />
              </ProtectedRoute>
            }
          />
          <Route
            path="usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="ajustes"
            element={
              <ProtectedRoute>
                <h1>Ajustes del Sistema</h1>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
