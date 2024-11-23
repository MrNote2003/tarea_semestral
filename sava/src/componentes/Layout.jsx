import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoSAVA from '../assets/logo-sava.png';

function Layout() {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario');
    const rol = localStorage.getItem('rolUsuario'); // Recupera el rol del usuario
    if (nombre) {
      setNombreUsuario(nombre);
    }
    if (rol) {
      setRolUsuario(rol); // Establece el rol en el estado
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario');
    navigate('/login');
  };

  // Función para renderizar las opciones del menú según el rol
  const renderMenu = () => {
    switch (rolUsuario) {
      case 'admin':
        return (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reportes"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Reportes
              </NavLink>
            </li>
          </>
        );
      case 'cliente':
        return (
          <>
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Generar Ticket
              </NavLink>
            </li>
          </>
        );
      case 'cajero':
        return (
          <>
            <li>
              <NavLink
                to="/caja"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-yellow-500 text-white"
                    : "block py-2 px-4 hover:bg-gray-700"
                }
              >
                Caja Registradora
              </NavLink>
            </li>
          </>
        );
      default:
        return null; // Opcional: maneja usuarios sin rol o no autenticados
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <img
          src={logoSAVA}
          alt="Logo SAVA"
          className="h-12 w-12 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-800 flex-grow text-center">
          SAVA
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Usuario: {nombreUsuario}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="text-center p-4 text-2xl font-semibold">
            SAVA
          </div>
          <nav className="flex-grow">
            <ul className="space-y-2">{renderMenu()}</ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex flex-col p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 flex items-center justify-center">
        <p className="text-center text-sm">© 2024 SAVA - Todos los derechos reservados</p>
        <img
          src={logoSAVA}
          alt="Logo SAVA"
          className="h-12 w-12 ml-4 object-cover"
        />
      </footer>
    </div>
  );
}

export default Layout;
