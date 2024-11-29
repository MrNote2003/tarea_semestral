import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function PagLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud de inicio de sesión
      const data = await loginUser(email, password);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('nombreUsuario', data.nombre);
        localStorage.setItem('rolUsuario', data.rol);
        navigate('/dashboard');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error en el servidor o credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login - SAVA</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta? <a href="/registro" className="text-blue-600">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default PagLogin;
