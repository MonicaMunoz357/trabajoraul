import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/*  Menú Horizontal */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">Tienda</h1>
        <Link to="/perfil" className="text-gray-600 hover:text-blue-500">Perfil</Link>
      </nav>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Lista de Productos</h2>

        {/*  Loading Indicator */}
        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700">{product.nombre}</h3>
                <p className="text-gray-500">{product.descripcion}</p>
                <p className="text-blue-500 font-bold mt-2">${product.precio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
