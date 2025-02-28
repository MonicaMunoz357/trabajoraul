import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfessorForm = () => {
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState(null);
  const [cv, setCV] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    if (foto) formData.append("foto", foto);
    if (cv) formData.append("cv", cv);
    formData.append("descripcion", descripcion);
    formData.append("especialidad", especialidad);
    formData.append("telefono", telefono);
    formData.append("correo", correo);

    try {
      const res = await axios.post("http://localhost:3000/profesores", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profesor agregado",
          text: "El profesor se ha subido correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "No se pudo agregar el profesor",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-green-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl h-full flex flex-col md:flex-row">
        {/* Sección Izquierda: Formulario */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">Agregar Profesor</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-600"
                placeholder="Ingresa el nombre completo"
                required
              />
            </div>

            {/* Especialidad */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Especialidad</label>
              <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="w-full border border-gray-300 p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-600"
                placeholder="Ej. Ingeniería de Software"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-gray-300 p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-600"
                placeholder="Ingresa el teléfono"
                required
              />
            </div>

            {/* Correo */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border border-gray-300 p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-600"
                placeholder="Ingresa el correo electrónico"
                required
              />
            </div>

            {/* Descripción */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-green-600"
                placeholder="Describe brevemente al profesor"
                required
              ></textarea>
            </div>

            {/* Botón de envío */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
              >
                Subir Profesor
              </button>
            </div>
          </form>
        </div>

        {/* Sección Derecha: Imagen de perfil y CV */}
        <div className="w-full md:w-1/3 p-8 bg-gray-900 flex flex-col items-center justify-center rounded-r-lg">
          <h3 className="text-xl font-bold text-green-700 mb-4">Sube la Foto y el CV</h3>

          {/* Foto */}
          <div className="mb-6 w-full">
            <label className="block text-green-700 font-medium mb-2">Foto (Imagen)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          {/* CV */}
          <div className="w-full">
            <label className="block text-green-700 font-medium mb-2">CV (Archivo)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => setCV(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorForm;
