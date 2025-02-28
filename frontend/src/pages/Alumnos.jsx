import React, { useState, useEffect } from "react";
import { FaUserCircle, FaHome, FaBook, FaNewspaper, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const AttendanceScreen = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching students..."); // Depuración
        const response = await axios.get('http://localhost:5001/alumnos');
        console.log("Data received:", response.data); 
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleAttendanceChange = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Universidad Tecnológica de Durango</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Inicio</a>
          <a href="#" className="text-white hover:text-gray-300">Noticias</a>
          <a href="#" className="text-white hover:text-gray-300">Eventos</a>
          <a href="#" className="text-white hover:text-gray-300">Contacto</a>
        </nav>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-64 p-6 hidden md:flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <FaUserCircle size={64} />
            <h2 className="mt-4 text-xl font-semibold">Mi Perfil</h2>
          </div>
          <nav className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3 hover:text-green-300"><FaHome /> Inicio</a>
            <a href="#" className="flex items-center gap-3 hover:text-green-300"><FaBook /> Cursos</a>
            <a href="#" className="flex items-center gap-3 hover:text-green-300"><FaNewspaper /> Noticias</a>
            <a href="#" className="flex items-center gap-3 hover:text-green-300"><FaCalendarAlt /> Eventos</a>
            <a href="#" className="flex items-center gap-3 hover:text-green-300"><FaCog /> Configuración</a>
            <a href="#" className="flex items-center gap-3 text-red-300 hover:text-red-400 mt-auto"><FaSignOutAlt /> Cerrar sesión</a>
          </nav>
        </aside>

        <main className="flex-1 p-10 bg-gray-50">
          <h1 className="text-4xl font-bold text-green-800 mb-10">Registro de Asistencia</h1>
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 p-2 border rounded w-full"
          />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">Nombre</th>
                  <th className="border p-2 text-center">Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          checked={student.present}
                          onChange={() => handleAttendanceChange(student.id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition">
            Guardar
          </button>
        </main>
      </div>
    </div>
  );
};

export default AttendanceScreen;