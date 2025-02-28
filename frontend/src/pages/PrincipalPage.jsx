import React from "react";
import { 
  FaUserCircle, 
  FaHome, 
  FaBook, 
  FaNewspaper, 
  FaCalendarAlt, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";
import Sidepage from "../components/sidepage"; // Importamos el componente Sidepage

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabecera */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Universidad Tecnológica de Durango</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-800">Inicio</a>
          <a href="#" className="text-white hover:text-gray-800">Noticias</a>
          <a href="#" className="text-white hover:text-gray-800">Eventos</a>
          <a href="#" className="text-white hover:text-gray-800">Contacto</a>
        </nav>
      </header>

      {/* Contenido principal: Menú lateral + Sección principal */}
      <div className="flex flex-1">
        {/* Reemplazamos el menú lateral con el componente Sidepage */}
        <Sidepage />

        {/* Sección principal */}
        <main className="flex-1 p-6 bg-gray-50 lg:ml-[300px]"> {/* Agregamos margen izquierdo para acomodar el ancho del sidebar */}
          {/* Sección Hero */}
          <section className="mb-8">
            <div className="bg-green-100 p-8 rounded-lg shadow-md">
              <h2 className="text-4xl font-bold text-green-800 mb-4">
                Bienvenido a la UTD
              </h2>
              <p className="text-green-700 text-lg">
                Explora nuestro campus virtual y mantente al día con las últimas noticias y eventos.
              </p>
              <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition">
                Explora ahora
              </button>
            </div>
          </section>

          {/* Sección Noticias y Eventos */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Noticias */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Noticias Recientes
              </h3>
              <p className="text-gray-700">
                Mantente informado sobre los últimos acontecimientos en la universidad. Consulta aquí nuestras noticias y actualizaciones.
              </p>
              <a href="#" className="text-green-600 mt-4 inline-block hover:underline">
                Ver más noticias
              </a>
            </div>
            {/* Eventos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Próximos Eventos
              </h3>
              <p className="text-gray-700">
                No te pierdas los próximos eventos, conferencias y actividades culturales que tenemos preparados para ti.
              </p>
              <a href="#" className="text-green-600 mt-4 inline-block hover:underline">
                Ver eventos
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 text-center text-gray-600">
            <p>© 2025 Universidad Tecnológica de Durango. Todos los derechos reservados.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;