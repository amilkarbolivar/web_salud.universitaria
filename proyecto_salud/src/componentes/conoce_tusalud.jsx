import { useState } from 'react';
import PropTypes from 'prop-types';

function Salud({ form }) {
  const [cuestionario1, setCuestionario1] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const cambiar_formulario = (cuestionarioSeleccionado) => {
    setCuestionario1(cuestionarioSeleccionado);
    setSubmitted(false);
  };

  const volver = () => {
    setCuestionario1(null);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      {cuestionario1 === null ? (
        <section className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Cuestionario de Salud Mental
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Estas preguntas son de autoevaluación y tienen fines informativos. No constituyen un diagnóstico.
            Si te sientes mal, busca apoyo profesional.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.map((cuestionarioItem, index) => (
              <button
                key={index}
                type="button"
                onClick={() => cambiar_formulario(cuestionarioItem)}
                className="p-5 bg-gradient-to-br from-red-500 to-rose-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 cursor-pointer shadow-md transition-all flex items-center justify-center"
              >
                {cuestionarioItem.titulo}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="w-full max-w-2xl">
          <form className="p-8 bg-gray-50 shadow-md rounded-lg" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
              {cuestionario1.titulo}
            </h3>
            {cuestionario1.preguntas.map((pregunta, index) => (
              <fieldset key={index} className="mb-6">
                <legend className="text-xl font-semibold text-gray-700 mb-2 block">
                  {pregunta.pregunta}
                </legend>
                <div className="grid grid-cols-1 gap-3">
                  {pregunta.opciones.map((opcion, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 hover:shadow-md cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name={`pregunta-${index}`}
                        value={opcion}
                        className="h-5 w-5 accent-red-500"
                        required={i === 0}
                      />
                      <span className="text-lg text-gray-600">{opcion}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-700 transition-all"
            >
              Enviar
            </button>
            {submitted && (
              <p className="mt-4 text-sm text-gray-600 text-center" role="status">
                Gracias por responder. Recuerda que este cuestionario es informativo y no sustituye la atención profesional.
              </p>
            )}
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={volver}
              className="text-red-600 hover:underline"
            >
              Volver a la lista
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Salud.propTypes = {
  form: PropTypes.array.isRequired,
};

export default Salud;