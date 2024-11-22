import { useState, useEffect } from 'react';
import axios from 'axios';

function Directorio() {
    const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el texto de búsqueda

  // Efecto para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    // Realizar la solicitud GET con Axios
    axios.get('http://localhost:8080/api/v1/empresas')
      .then(response => {
        // Asignar los datos a estado
        setEmpresas(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Manejo de errores
        setError(error);
        setLoading(false);
      });
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Filtrar las empresas según el término de búsqueda
  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizar carga o error
  if (loading) return <div className='flex w-full justify-center items-center h-screen text-5xl text-red-400'>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-5">
      {/* Barra de búsqueda */}
      <section className="mb-5">
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}  // Actualizar el texto de búsqueda
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mostrar las empresas filtradas en tarjetas */}
        {filteredEmpresas.length === 0 ? (
          <div>No se encontraron empresas.</div>
        ) : (
          filteredEmpresas.map((empresa, index) => (
            <div
              key={index}
              className="bg-white p-4 border-2 border-red-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{empresa.nombre_empresa}</h3>
              <p className="text-gray-600 mt-2">{empresa.descrip_empresa}</p>
              <div className="mt-4">
                <p className="font-medium text-gray-700">Correo: {empresa.correo_empresa}</p>
                <p className="font-medium text-gray-700">Teléfono: {empresa.telefono_empresa}</p>
              </div>
              <a
                href={empresa.url_empresa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                Visitar página
              </a>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Directorio;
