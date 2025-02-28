import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth.context"; // Importamos el hook del contexto

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // Usamos el contexto de autenticación
  const { login, errors: loginErrors } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Usamos la función login del contexto
      const success = await login({
        email,
        password
      });

      if (success) {
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
      console.error("Error en el inicio de sesión:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen">
      {/* Sección izquierda (verde) */}
      <div className="hidden md:block bg-gray-900 h-full">
        <img src="/img/bufalo.png" alt="Búfalo UTD" />
      </div>

      {/* Sección derecha (formulario) */}
      <div className="flex items-center justify-center bg-green-600 ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>

          {/* Mostrar errores del login */}
          {loginErrors.length > 0 && (
            <div className="mb-4">
              {loginErrors.map((error, i) => (
                <div key={i} className="bg-red-500 p-2 text-white text-center my-1 rounded-md">
                  {error}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border text-slate-950 border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border text-slate-950 border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-800 transition duration-300"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;