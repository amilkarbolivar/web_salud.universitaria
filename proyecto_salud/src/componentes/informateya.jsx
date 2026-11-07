import { useState, useEffect } from "react";
import { apiJson } from "../services/api";

function Infya() {
  const [articulos, setArticulos] = useState([]);
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await apiJson("/api/v1/articulos");
        if (!active) return;
        setArticulos(data);
        setFilteredArticulos(data);
      } catch (err) {
        if (active) setError(err.message || "No se pudieron cargar los artículos");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = articulos.filter((articulo) =>
      (articulo.titulo || "").toLowerCase().includes(term)
    );
    setFilteredArticulos(filtered);
  };

  const handleArticuloClick = (id) => {
    const articulo = articulos.find((art) => art.id_articulo === id);
    setSelectedArticulo(articulo || null);
  };

  const handleBackClick = () => setSelectedArticulo(null);

  if (loading) return <div className="flex w-full justify-center items-center h-screen text-2xl text-red-500" role="status">Cargando artículos...</div>;
  if (error) return <div className="p-6 text-red-600" role="alert">Error: {error}</div>;

  return (
    <div className="container h-screen mx-auto p-5">
      {!selectedArticulo ? (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Buscar artículos por título"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticulos.map((articulo) => (
              <button
                key={articulo.id_articulo}
                type="button"
                className="text-left p-5 border border-gray-100 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer transition-all"
                onClick={() => handleArticuloClick(articulo.id_articulo)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{articulo.titulo}</h3>
              </button>
            ))}
            {filteredArticulos.length === 0 && (
              <p className="text-gray-500 col-span-full">No se encontraron artículos.</p>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <button
            onClick={handleBackClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-6"
          >
            Atrás
          </button>
          {selectedArticulo.multimedia_url && (
            <img src={selectedArticulo.multimedia_url} alt={selectedArticulo.titulo} className="w-full rounded-lg mb-4" />
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedArticulo.titulo}</h2>
          <p className="text-gray-700 text-lg mb-4">{selectedArticulo.contenido}</p>
          <p className="text-sm text-gray-500">
            <strong>Fecha de Publicación:</strong>{" "}
            {selectedArticulo.fecha_publicacion}
          </p>
        </div>
      )}
    </div>
  );
}

export default Infya;