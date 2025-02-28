import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Ahora aceptamos props para hacer el componente más flexible
function Sidepage({ useAuth = null }) {
  // Si no se proporciona useAuth, creamos un valor por defecto para evitar errores
  const defaultAuth = {
    logout: () => console.log('Logout function not provided'),
    user: { perfil: { secure_url: null } }
  };
  
  // Usamos el contexto de autenticación si está disponible o el valor por defecto
  const { logout, user } = useAuth ? useAuth() : defaultAuth;

  const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('hidden');
  };

  const handleLogout = () => {
    if (logout) {
      Swal.fire({
        title: 'Seguro de salir?',
        text: "Estás a punto de cerrar sesión",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
        }
      });
    }
  };

  return (
    <div>
      <button className="absolute text-white text-4xl top-5 left-4 cursor-pointer lg:hidden z-20" onClick={toggleSidebar}>
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </button>

      <div className="sidebar fixed top-0 bottom-0 left-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white shadow-lg h-screen z-10 lg:block hidden">
        <div className="text-black text-xl">

          {/* Perfil del Usuario */}
          <div className="p-2.5 mt-1 flex items-center rounded-md justify-center">
            <img 
              src={user?.perfil?.secure_url || '/default-profile.png'}  // Imagen por defecto en caso de no tener perfil
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          
          <div className="text-center mb-4">
            <h2 className="font-semibold">{user?.nombre || 'Usuario'}</h2>
          </div>

          <div className="p-2.5 mt-1 flex items-center justify-end rounded-md">
            <i className="bi bi-x cursor-pointer lg:hidden" onClick={toggleSidebar} style={{ fontSize: '2rem' }}></i>
          </div>

          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-house-door-fill text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Inicio</span>
          </div>

          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-people-fill text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Conductores</span>
          </div>

          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-folder-fill text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Permisos</span>
          </div>

          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-truck text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Camiones</span>
          </div>
          
          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-archive-box text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Cajas</span>
          </div>

          <div className="p-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-100">
            <i className="bi bi-person-circle text-green-700"></i>
            <span className="text-[17px] ml-4 text-black">Perfil</span>
          </div>

          <hr className="my-4 text-gray-600" />

          <div className="p-2 mt-10 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-100">
            <i className="bi bi-box-arrow-in-right text-red-700"></i>
            <span className="text-[17px] ml-4 text-red-700" onClick={handleLogout}>Salir</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidepage;