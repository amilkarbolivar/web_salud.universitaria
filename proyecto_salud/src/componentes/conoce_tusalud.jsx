import  { useState } from 'react';
import PropTypes from 'prop-types';

function Salud({ form }) {
    const [mostrarCuestionario, setMostrarCuestionario] = useState(false);

    const toggleCuestionario = () => {
        setMostrarCuestionario(!mostrarCuestionario);
    };

    return (
        <section className="h-auto p-10 flex justify-center items-center flex-col">
            <h2 className="mt-16 mb-8 text-black text-3xl">Cuestionario de salud mental</h2>
            <button
                onClick={toggleCuestionario}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
                {mostrarCuestionario ? 'Ocultar Cuestionario' : 'Mostrar Cuestionario'}
            </button>
            
            {mostrarCuestionario && (
                <form className="w-full flex gap-3 flex-col justify-center items-center mt-8">
                    {form.map((cuestionario, index) => (
                        <div key={index} className="mb-6">
                            <p className="text-lg font-semibold mb-2">{cuestionario.pregunta}</p>
                            {cuestionario.opciones.map((opcion, opcionIndex) => (
                                <label key={opcionIndex} className="  flex  gap-5 text-gray-700 text-sm mb-1">
                                    <input
                                        type="radio"
                                        name={`pregunta-${index}`}
                                        value={opcion}
                                        className="mr-2"
                                    />
                                    {opcion}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    >
                        Enviar
                    </button>
                </form>
            )}
        </section>
    );
}

Salud.propTypes = {
    form: PropTypes.array.isRequired
};

export default Salud;
