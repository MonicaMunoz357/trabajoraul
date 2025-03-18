import React, { useState, useEffect } from "react";
import { FaUserCircle, FaHome, FaBook, FaNewspaper, FaCalendarAlt, FaGraduationCap,FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const AttendanceScreen = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name"); // Tipo de filtro
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [saveMessage, setSaveMessage] = useState(""); 

  // Obtener los datos de la API al cargar el componente
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching students..."); // Depuración
        const response = await axios.get('http://localhost:3000/alumnos');
        console.log("Data received:", response.data); // Depuración

        const mappedStudents = response.data.map(alumno => ({
          id: alumno.id_alumno, // Mapear id_alumno a id
          name: alumno.nombre_completo, 
          carrera: alumno.carrera, 
          present: false // Valor por defecto para la asistencia
        }));

        setStudents(mappedStudents);
        setFilteredStudents(mappedStudents); // Inicialmente, mostrar todos los alumnos
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filtrar los alumnos
    const filtered = students.filter((student) => {
      if (filterType === "name") {
        return student.name.toLowerCase().includes(term.toLowerCase());
      } else if (filterType === "id") {
        return student.id.toString().includes(term);
      } else if (filterType === "carrera") {
        return student.carrera.toLowerCase().includes(term.toLowerCase());
      } else if (filterType === "present") {
        return student.present === true;
      } else if (filterType === "absent") {
        return student.present === false;
      }
      return true;
    });

    setFilteredStudents(filtered);
  };

  // Función para manejar el cambio de asistencia
  const handleAttendanceChange = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );

    // Actualizar también la lista filtrada
    setFilteredStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };
  const handleSave = async () => {
    try {
      // Filtrar solo los alumnos con cambios en la asistencia
      const updatedStudents = students.filter((student) => student.present !== false);
  
      console.log("Datos a enviar:", updatedStudents); // Depuración
  
      // Enviar los datos al backend
      const response = await axios.post('http://localhost:3000/guardar-asistencias', {
        students: updatedStudents
      });
  
      // Mostrar mensaje de éxito
      setSaveMessage(response.data.message);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error al guardar asistencias:", error);
      setSaveMessage("Error al guardar asistencias");
      setTimeout(() => setSaveMessage(""), 3000);
    }
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
            <a href="/home" className="flex items-center gap-3 text-white hover:text-green-300"><FaHome /> Inicio</a>
            <a href="#" className="flex items-center gap-3 text-white hover:text-green-300"><FaBook /> Cursos</a>
            <a href="#" className="flex items-center gap-3 text-white hover:text-green-300"><FaNewspaper /> Noticias</a>
            <a href="#" className="flex items-center gap-3 text-white hover:text-green-300"><FaCalendarAlt /> Eventos</a>
            <a href="#" className="flex items-center gap-3 text-white hover:text-green-300"><FaCog /> Configuración</a>
            <a href="/alumnos" className="flex items-center gap-3 text-white hover:text-green-300"><FaGraduationCap /> Alumnos</a>
            <a href="/add_profesor" className="flex items-center gap-3 text-white hover:text-green-300"><FaUser /> Profesores</a>
            <a href="#" className="flex items-center gap-3 text-red-300 hover:text-red-400 mt-auto"><FaSignOutAlt /> Cerrar sesión</a>
          </nav>
        </aside>

        <main className="flex-1 p-10 bg-gray-50">
          <h1 className="text-4xl font-bold text-green-800 mb-10">Registro de Asistencia</h1>
          <div className="flex gap-4 mb-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="name">Nombre</option>
              <option value="id">ID</option>
              <option value="carrera">Carrera</option>
              
            </select>
            <input
              type="text"
              placeholder={`Buscar por ${filterType === "name" ? "nombre" : filterType === "id" ? "ID" : "carrera"}...`}
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">Nombre</th>
                  <th className="border p-2 text-left">Carrera</th>
                  <th className="border p-2 text-center">Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">{student.carrera}</td>
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          checked={student.present}
                          onChange={() => handleAttendanceChange(student.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border p-2 text-center">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {saveMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
              {saveMessage}
            </div>
          )}
          <button
            onClick={handleSave}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
          >
            Guardar
          </button>
        </main>
      </div>
    </div>
  );
};

export default AttendanceScreen;