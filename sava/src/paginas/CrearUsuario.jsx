import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/api';
import { useNavigate } from 'react-router-dom';


function CrearUsuario() {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [cargo, setCargo] = useState('');
    const [area, setArea] = useState('');
    const [perfil, setPerfil] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createUser( correo, nombre, cargo, area, perfil);
        alert('Usuario creado exitosamente');
        navigate('/usuarios');
      } catch (error) {
        console.error('Error al crear usuario:', error);
        alert('Error al crear usuario: ' + (error.response?.data?.error || 'Ha ocurrido un error inesperado'));
      }
    };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Creación de usuarios</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="correo" className="text-sm font-medium text-gray-700">Correo</label>
            <input
              type="text"
              id="correo"
              name="correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 border rounded"
            />
        </div>
        <div >
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 border rounded"
            />
        </div>
        <div>
          <label htmlFor="cargo" className="text-sm font-medium text-gray-700">Cargo</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              required
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="mt-1 border rounded"
            />
        </div>
        <div>
          <label htmlFor="area" className="text-sm font-medium text-gray-700">Área</label>
            <input
              type="text"
              id="area"
              name="area"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 border rounded"

            />
        </div>
        <div>
          <label htmlFor="perfil" className="text-sm font-medium text-gray-700">Perfil</label>
            <input
              type="text"
              id="perfil"
              name="perfil"
              required
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              className="mt-1 border rounded"

            />
        </div>
        <div className='Boton'>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
              Crear Usuario
            </button>
            <Link to="/usuarios" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400'>
                Volver
            </Link>
        </div>
      </form>
    </section>
  );
}

export default CrearUsuario;