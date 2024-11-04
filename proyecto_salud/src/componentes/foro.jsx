import { useState } from 'react';
import Atras from '@mui/icons-material/ArrowBack'
// Lista de foros simulada con JSON
const forosIniciales = [
    {
        id: 1,
        fecha: '10/4/2020',
        titulo: 'Foro de tecnología',
        descripcion: 'Espacio para hablar de tecnología y avances en tecnologia y desarriollo.',
        mensajes: [
            { 
            usuario: 'Carlos',
            contenido: 'La inteligencia artificial está revolucionando el mundos.',
            fecha: '10/4/2020' 
        }
        ]
    },
    {
        id: 2,
        fecha: '10/4/2020',
        titulo: 'Foro de salud',
        descripcion: 'Foro para hablar de temas de salud y bienestar.',
        mensajes: [
            {
            usuario: 'Ana',
            contenido: 'El ejercicio es fundamental para la salud mental.',
            fecha: '10/4/2020' 
        }
        ]
    }
];

function Foro() {
    const [foros, setForos] = useState(forosIniciales);
    const [foroSeleccionado, setForoSeleccionado] = useState(null);
    const [nuevoMensaje, setNuevoMensaje] = useState('');

    // Manejador para seleccionar un foro y mostrar su vista detallada
    const seleccionarForo = (foro) => {
        setForoSeleccionado(foro);
    };

    // Volver a la lista de foros
    const regresarALaLista = () => {
        setForoSeleccionado(null);
    };

    // Manejador para actualizar el nuevo mensaje
    const manejarCambioMensaje = (e) => {
        setNuevoMensaje(e.target.value);
    };

    // Añadir el nuevo mensaje al foro seleccionado
    const agregarMensaje = () => {
        if (nuevoMensaje.trim() === '') return; // Verificar que el mensaje no esté vacío

        const nuevoMensajeObjeto = {
            usuario: 'Nuevo Usuario',
            contenido: nuevoMensaje,
            fecha: new Date().toLocaleDateString() // Agrega la fecha actual
        };

        const foroActualizado = {
            ...foroSeleccionado,
            mensajes: [...foroSeleccionado.mensajes, nuevoMensajeObjeto]
        };

        // Actualizar el estado de los foros con el nuevo mensaje
        setForos((foros) =>
            foros.map((foro) => (foro.id === foroActualizado.id ? foroActualizado : foro))
        );
        setForoSeleccionado(foroActualizado);
        setNuevoMensaje('');
    };

    return (
        <div className="p-4">
            {/* Si hay un foro seleccionado, mostramos la vista detallada */}
            {foroSeleccionado ? (
                <div className="border-2 h-screen w-full flex flex-col items-center justify-start">
                    <div className="h-full w-[60%]  ">
                        
                        <div className='mb-4 mt-10 border-2 shadow-md shadow-zinc-400 bg-white p-4 rounded-xl'>
                          <Atras onClick={regresarALaLista} className="text-lg text-red-600 cursor-pointer underline "/>
                        <div className="flex flex-col items-center">
                            <h2 className="p-3 mb-1 rounded-2xl  text-3xl font-bold">{foroSeleccionado.titulo}</h2>
                            <p className="text-gray-700 text-3xl mb-4">{foroSeleccionado.descripcion}</p>
                        </div>
                        <div className="flex mb-4 gap-4 items-center">
                            <textarea
                                className="w-full h-12 rounded-xl border-2 border-gray-300 focus:border-red-500 ease-in-out focus:outline-none resize-none p-2"
                                placeholder="  Escribe tu mensaje"
                                value={nuevoMensaje}
                                onChange={manejarCambioMensaje}
                            />
                            <button
                                onClick={agregarMensaje}
                                className="w-32 h-9 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                            >
                                Agregar
                            </button>
                        </div>
                        </div>

                        {/* Lista de mensajes */}
                        <ul className="flex flex-col gap-3 mb-4 mt-3">
                            {foroSeleccionado.mensajes.map((mensaje, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col bg-white p-4 rounded-xl w-full shadow-md shadow-zinc-400 ">
                                    <div className="flex justify-between">
                                        <strong className="text-lg">{mensaje.usuario}</strong>
                                        <span className="text-sm text-gray-500">{mensaje.fecha}</span>
                                    </div>
                                    <p className="text-gray-700 ">{mensaje.contenido}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                // Si no hay foro seleccionado, mostramos la lista de foros
                <div className='h-screen flex flex-col justify-start items-center gap-4'>
                    <div className='w-72 flex   rounded-lg mt-12 p-5'>
                    <h2 className=" text-3xl font-bold ">Lista de Foros</h2>
                    </div>
                    <ul className='w-full flex flex-col items-center'>
                        {foros.map((foro) => (
                            <li
                                key={foro.id}
                                onClick={() => seleccionarForo(foro)}
                                className="bg-white w-[50%] border-[1px] mb-1  rounded-lg p-4  cursor-pointer hover:bg-slate-300"
                            >
                                <h3 className="text-xl font-semibold">{foro.titulo}</h3>
                                <p className="text-gray-700">{foro.descripcion}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Foro;
