import { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    area: '',
    perfil: '',
    tickets: 0,
    contraseña: '',
    rol: 'admin',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5101/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:5101/api/usuarios', formData);
      setUsuarios([...usuarios, response.data.usuario]);
      setFormData({ nombre: '', email: '', area: '', perfil: '', tickets: 0, contraseña: '', rol: 'admin' });
      setShowModal(false);
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5101/api/usuarios/${editId}`, formData);
      setUsuarios(usuarios.map((u) => (u._id === editId ? response.data.usuario : u)));
      setFormData({ nombre: '', email: '', area: '', perfil: '', tickets: 0, contraseña: '', rol: 'admin' });
      setEditId(null);
      setIsEditing(false);
      setShowModal(false);
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar usuario');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5101/api/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
      alert('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  const openModal = (isEdit = false, usuario = null) => {
    setShowModal(true);

    if (isEdit && usuario) {
      setIsEditing(true);
      setEditId(usuario._id);
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        area: usuario.area,
        perfil: usuario.perfil,
        tickets: usuario.tickets,
        contraseña: '',
        rol: usuario.rol,
      });
    } else {
      setIsEditing(false);
      setFormData({ nombre: '', email: '', area: '', perfil: '', tickets: 0, contraseña: '', rol: 'admin' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ nombre: '', email: '', area: '', perfil: '', tickets: 0, contraseña: '', rol: 'admin' });
    setEditId(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <div className="bg-white shadow-md rounded p-6">
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
        >
          Crear Usuario
        </button>
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Área</th>
              <th className="border px-4 py-2">Perfil</th>
              <th className="border px-4 py-2">Rol</th>
              <th className="border px-4 py-2">Tickets</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td className="border px-4 py-2">{usuario.nombre}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">{usuario.area}</td>
                <td className="border px-4 py-2">{usuario.perfil}</td>
                <td className="border px-4 py-2">{usuario.rol}</td>
                <td className="border px-4 py-2">{usuario.tickets}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal(true, usuario)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Editar
                  </button>
                  /
                  <button
                    onClick={() => handleDeleteUser(usuario._id)}
                    className="text-red-600 hover:underline ml-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="area"
                placeholder="Área"
                value={formData.area}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="perfil"
                placeholder="Perfil"
                value={formData.perfil}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              >
                <option value="admin">Admin</option>
                <option value="cliente">Cliente</option>
                <option value="cajero">Cajero</option>
              </select>
              <input
                type="number"
                name="tickets"
                placeholder="Tickets"
                value={formData.tickets}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={isEditing ? handleEditUser : handleCreateUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              >
                {isEditing ? 'Guardar Cambios' : 'Crear'}
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;
