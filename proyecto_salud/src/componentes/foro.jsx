import { useState, useEffect } from "react";
import Atras from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Foro() {
    const [foros, setForos] = useState([]);
    const [foroSeleccionado, setForoSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreForo, setNombreForo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchForos = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/foros");
                if (!response.ok) {
                    throw new Error("Error al cargar los foros");
                }
                const data = await response.json();
                setForos(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchForos();
    }, []);

    const crearForo = async (e) => {
        e.preventDefault();

        if (!nombreForo || !descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const nuevoForo = {
            nombre_foro: nombreForo,
            descripcion: descripcion,
            id_usuario: {
                id_usuario: user.id_usuario,
            },
            fecha_creacion: new Date().toLocaleDateString("es-ES"),
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/foros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoForo),
            });
            
            if (response.ok) {
                const data = await response.json();
                alert("¡Foro creado exitosamente!");
                setForos((prevForos) => [...prevForos, data]);
                setMostrarFormulario(false); // Cerrar formulario después de crear el foro
                setNombreForo(""); // Limpiar el campo de nombre del foro
                setDescripcion(""); // Limpiar el campo de descripción
            } else {
                alert("Error al crear el foro. Verifique los datos enviados.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMostrarFormulario(false); // Cerrar formulario en caso de error
        }
    };

    const agregarMensaje = async () => {
        if (!mensaje.trim()) {
            alert("Por favor, escriba un mensaje antes de enviarlo.");
            return;
        }

        const nuevoMensaje = {
            contenido: mensaje,
            autor: user?.nombre || "Anónimo",
            fecha: new Date().toLocaleDateString("es-ES"),
        };

        try {
            const response = await fetch(`http://localhost:8080/api/v1/foros/${foroSeleccionado.id}/mensajes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoMensaje),
            });

            if (response.ok) {
                const data = await response.json();
                setForoSeleccionado((prevForo) => ({
                    ...prevForo,
                    mensajes: [...(prevForo.mensajes || []), data],
                }));
                setMensaje(""); // Limpiar campo de mensaje
            } else {
                alert("Error al enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const cargarMensajes = async (foroId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/foros/${foroId}/mensajes`);
            if (response.ok) {
                const data = await response.json();
                setForoSeleccionado((prevForo) => ({
                    ...prevForo,
                    mensajes: data,
                }));
            } else {
                console.error("Error al cargar los mensajes.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const seleccionarForo = (foro) => {
        setForoSeleccionado(foro);
        cargarMensajes(foro.id); // Cargar los mensajes del foro seleccionado
    };

    if (!user) {
        return (
            <div className="h-screen flex justify-center items-center ">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">
                        ¡Hola! Para interactuar en los foros, por favor inicie sesión.
                    </h2>
                    <button
                        className="bg-red-500  px-6 py-2 rounded-lg shadow-lg hover:bg-red-700"
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
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {foros.length > 0 ? (
                           foros.map((foro) => (
                               <div
                                   key={foro.id}
                                   onClick={() => seleccionarForo(foro)}
                                   className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
                               >
                                   <h3 className="text-xl font-semibold text-red-600">{foro.nombre_foro}</h3>
                                   <p className="text-gray-600 mt-2">{foro.descripcion}</p>
                               </div>
                           ))
                       ) : (
                           <p className="text-center text-gray-500 col-span-3">Cargando foros...</p>
                       )}
                   </div>
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
                        placeholder="Descripción del foro"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={crearForo}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out"
                        >
                            Crear Foro
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
                            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition ease-in-out"
                        >
                            Enviar mensaje
                        </button>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800">Mensajes</h3>
                        <ul className="space-y-4">
                            {foroSeleccionado.mensajes && foroSeleccionado.mensajes.length > 0 ? (
                                foroSeleccionado.mensajes.map((mensaje, index) => (
                                    <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                        <p className="font-semibold">{mensaje.autor}</p>
                                        <p className="text-gray-700">{mensaje.contenido}</p>
                                        <span className="text-sm text-gray-500">{mensaje.fecha}</span>
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
