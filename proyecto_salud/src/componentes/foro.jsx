import { useState, useEffect } from "react";
import Atras from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { apiFetch, apiJson } from "../services/api";

function Foro() {
  const [foros, setForos] = useState([]);
  const [foroSeleccionado, setForoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreForo, setNombreForo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user } = useUser();

  const fetchForos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiJson("/api/v1/foros");
      setForos(data);
    } catch (err) {
      setError(err.message || "Error al cargar los foros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForos();
  }, []);

  const crearForo = async (e) => {
    e.preventDefault();
    if (!nombreForo.trim() || !descripcion.trim()) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiFetch("/api/v1/foros", {
        method: "POST",
        body: {
          nombre_foro: nombreForo.trim(),
          descripcion: descripcion.trim(),
          id_usuario: user?.id ? { id_usuario: user.id } : null,
          fecha_creacion: new Date().toLocaleDateString("es-ES"),
        },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Error al crear el foro");
      }
      const data = await response.json();
      setForos((prev) => [...prev, data]);
      setMostrarFormulario(false);
      setNombreForo("");
      setDescripcion("");
    } catch (err) {
      alert(err.message || "Error al crear el foro.");
    } finally {
      setSubmitting(false);
    }
  };

  const agregarMensaje = async () => {
    if (!mensaje.trim() || !foroSeleccionado) return;

    setSubmitting(true);
    try {
      const response = await apiFetch(`/api/v1/foros/${foroSeleccionado.id}/mensajes`, {
        method: "POST",
        body: {
          contenido: mensaje.trim(),
          autor: user?.nombre || "Anónimo",
          fecha: new Date().toLocaleDateString("es-ES"),
          id_usuario: user?.id || null,
        },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Error al enviar el mensaje");
      }
      const data = await response.json();
      setForoSeleccionado((prev) => ({
        ...prev,
        mensajes: [...(prev.mensajes || []), data],
      }));
      setMensaje("");
    } catch (err) {
      alert(err.message || "Error al enviar el mensaje.");
    } finally {
      setSubmitting(false);
    }
  };

  const cargarMensajes = async (foroId) => {
    try {
      const data = await apiJson(`/api/v1/foros/${foroId}/mensajes`);
      setForoSeleccionado((prev) => (prev ? { ...prev, mensajes: data } : prev));
    } catch (err) {
      console.error(err);
    }
  };

  const seleccionarForo = (foro) => {
    setForoSeleccionado({ ...foro, mensajes: foro.mensajes || [] });
    cargarMensajes(foro.id);
  };

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            ¡Hola! Para interactuar en los foros, por favor inicie sesión.
          </h2>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700"
            onClick={() => navigate("/registro-inicio")}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {error && <p className="text-red-600 mb-4" role="alert">{error}</p>}

      {!mostrarFormulario && !foroSeleccionado && (
        <>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out"
          >
            Crear Foro
          </button>

          <div className="mt-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Lista de Foros</h2>

            {loading ? (
              <p className="text-center text-gray-500">Cargando foros...</p>
            ) : foros.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foros.map((foro) => (
                  <div
                    key={foro.id}
                    onClick={() => seleccionarForo(foro)}
                    className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-red-600">{foro.nombre_foro}</h3>
                    <p className="text-gray-600 mt-2">{foro.descripcion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No hay foros todavía.</p>
            )}
          </div>
        </>
      )}

      {mostrarFormulario && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Crear un nuevo foro</h3>
          <input
            type="text"
            value={nombreForo}
            onChange={(e) => setNombreForo(e.target.value)}
            className="w-full p-3 border-2 rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Nombre del foro"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border-2 rounded-lg mb-6 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Descripción"
          />
          <div className="flex justify-between">
            <button
              onClick={crearForo}
              disabled={submitting}
              className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out disabled:opacity-60"
            >
              {submitting ? "Creando..." : "Crear Foro"}
            </button>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {foroSeleccionado && (
        <div className="bg-white p-8 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
          <button
            onClick={() => setForoSeleccionado(null)}
            className="flex items-center text-red-500 hover:text-red-700 mb-6"
          >
            <Atras className="mr-2" /> Volver a la lista
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{foroSeleccionado.nombre_foro}</h2>
          <p className="text-gray-700 mb-6">{foroSeleccionado.descripcion}</p>

          <div className="my-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar un mensaje:</h3>
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full p-3 border-2 rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Escribe tu mensaje"
            />
            <button
              onClick={agregarMensaje}
              disabled={submitting}
              className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Mensajes</h3>
            <ul className="space-y-4">
              {foroSeleccionado.mensajes && foroSeleccionado.mensajes.length > 0 ? (
                foroSeleccionado.mensajes.map((m, index) => (
                  <li key={m.id || index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <p className="font-semibold">{m.autor || "Anónimo"}</p>
                    <p className="text-gray-700">{m.contenido}</p>
                    <span className="text-sm text-gray-500">{m.fecha}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No hay mensajes en este foro.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Foro;