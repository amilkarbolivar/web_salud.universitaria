import { useState } from 'react';
import PropTypes from 'prop-types';

function Salud({ form }) {
  const [cuestionario1, setCuestionario1] = useState(null);

  // Cambiar formulario cuando se selecciona un cuestionario
  const cambiar_formulario = (cuestionarioSeleccionado) => {
    setCuestionario1(cuestionarioSeleccionado); // Aquí se actualiza el estado con el cuestionario seleccionado
  };

  return (
 
     <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
  {/* Condición para mostrar los cuestionarios o las preguntas */}
  {cuestionario1 === null ? (
    <section className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Cuestionario de Salud Mental
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {form.map((cuestionarioItem, index) => (
          <div
            key={index}
            onClick={() => cambiar_formulario(cuestionarioItem)} // Cuando se hace clic, se selecciona el cuestionario
            className="p-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 cursor-pointer shadow-md transition-all flex items-center justify-center"
          >
            {cuestionarioItem.titulo} {/* Mostrar el título del cuestionario */}
          </div>
        ))}
      </div>
    </section>
      ) : (
        // Si se ha seleccionado un cuestionario, se muestran las preguntas
        <div className=''>
<form className="p-16 bg-gray-50 shadow-md rounded-lg max-w-2xl mx-auto">
  <h3 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
    {cuestionario1.titulo}
  </h3>
  {cuestionario1.preguntas.map((pregunta, index) => (
    <div key={index} className="mb-6">
      {/* Pregunta */}
      <label
        htmlFor={`pregunta-${index}`}
        className="text-xl font-semibold text-gray-700 mb-2 block"
      >
        {pregunta.pregunta}
      </label>
      {/* Opciones */}
      <div className="grid grid-cols-1 gap-4">
        {pregunta.opciones.map((opcion, i) => (
          <label
            key={i}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 hover:shadow-md cursor-pointer transition-all"
          >
            <input
              type="radio"
              name={`pregunta-${index}`}
              value={`opcion-${i}`}
              className="h-5 w-5 accent-blue-500"
              required={i === 0} // Asegura que al menos un radio sea obligatorio
            />
            <span className="text-lg text-gray-600">{opcion}</span>
          </label>
        ))}
      </div>
    </div>
  ))}
  <button
    type="submit"
    className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
  >
    Enviar
  </button>
</form>

</div>
      )}
    </div>
  );
}

Salud.propTypes = {
  form: PropTypes.array.isRequired, // Asegura que "form" sea un array
};

export default Salud;
