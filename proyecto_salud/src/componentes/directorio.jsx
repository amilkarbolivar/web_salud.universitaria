import { useState, useEffect } from 'react';
import { apiJson } from "../services/api";

function Directorio() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await apiJson('/api/v1/empresas');
        if (!active) return;
        setEmpresas(data);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filteredEmpresas = empresas.filter((empresa) =>
    (empresa.nombre_empresa || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className='flex w-full justify-center items-center h-screen text-2xl text-red-400' role="status">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600" role="alert">Error: {error.message}</div>;

  return (
    <div className="p-5">
      <section className="mb-5">
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar empresa de salud"
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmpresas.length === 0 ? (
          <div>No se encontraron empresas.</div>
        ) : (
          filteredEmpresas.map((empresa, index) => (
            <div
              key={empresa.id || index}
              className="bg-white p-5 border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800">{empresa.nombre_empresa}</h3>
              <p className="text-gray-600 mt-2">{empresa.descrip_empresa}</p>
              <div className="mt-4 space-y-1">
                {empresa.correo_empresa && <p className="font-medium text-gray-700">Correo: {empresa.correo_empresa}</p>}
                {empresa.telefono_empresa && <p className="font-medium text-gray-700">Teléfono: {empresa.telefono_empresa}</p>}
              </div>
              {empresa.url_empresa && (
                <a
                  href={empresa.url_empresa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-500 hover:text-blue-700"
                >
                  Visitar página
                </a>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Directorio;