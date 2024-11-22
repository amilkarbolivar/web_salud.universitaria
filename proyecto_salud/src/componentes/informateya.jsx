import { useState, useEffect } from 'react';
import axios from 'axios';

function Infya() {
  const [articulos, setArticulos] = useState([]);  // Estado para almacenar los artículos
  const [selectedArticulo, setSelectedArticulo] = useState(null);  // Estado para almacenar el artículo seleccionado

  // Función para obtener los artículos desde la API
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/articulos')
      .then(response => {
        setArticulos(response.data);  // Almacena los artículos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los artículos', error);
      });
  }, []);  // Se ejecuta una sola vez al cargar el componente

  // Función para seleccionar un artículo
  const handleArticuloClick = (id) => {
    const articulo = articulos.find(art => art.id_articulo === id);  // Busca el artículo por ID
    setSelectedArticulo(articulo);  // Establece el artículo seleccionado
  };

  // Función para regresar a la lista de artículos
  const handleBackClick = () => {
    setSelectedArticulo(null);  // Resetea el artículo seleccionado y regresa a la lista
  };

  return (
    <div className="container mx-auto p-5">
      {/* Mostrar la lista de artículos solo si no se ha seleccionado ninguno */}
      {!selectedArticulo ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulos.map((articulo) => (
            <div
              key={articulo.id_articulo}
              className="p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
              onClick={() => handleArticuloClick(articulo.id_articulo)}  // Muestra el artículo completo al hacer click
            >
              <h3 className="text-xl font-semibold text-gray-800">{articulo.titulo}</h3>  {/* Solo muestra el título */}
            </div>
          ))}
        </div>
      ) : (
        // Mostrar el detalle del artículo seleccionado
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <button
            onClick={handleBackClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-6"
          >
            Atrás
          </button>
          <img src={selectedArticulo.multimedia_url} alt="" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedArticulo.titulo}</h2>
          <p className="text-gray-700 text-lg mb-4">{selectedArticulo.contenido}</p>
          <p className="text-sm text-gray-500"><strong>Fecha de Publicación:</strong> {selectedArticulo.fecha_publicacion}</p>

        </div>
      )}
    </div>
  );
}

export default Infya;
