import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, contra },
        { withCredentials: true }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Redirigiendo...",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error en el inicio de sesión",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundColor: "#1E3A8A", // Azul de fondo
        height: "100vh", // Asegura que ocupe toda la pantalla
        width: "100vw", // Asegura que ocupe todo el ancho de la pantalla
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-md w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition duration-300">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;