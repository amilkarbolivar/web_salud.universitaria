import { useState } from 'react';
import FlechasLEFT from '@mui/icons-material/ArrowLeft';
import FlechasRIGHT from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';

function Informacion({ datos2 }) {
  const [desplazamiento, setDesplazamiento] = useState(0);
  const maxDesplazamiento = 100 / (datos2.length);

  const handleRightClick = () => {
    if (desplazamiento !== -maxDesplazamiento * (datos2.length - 1)) {
      setDesplazamiento(desplazamiento - maxDesplazamiento);
    } else {
      setDesplazamiento(0);
    }
  };

  const handleLeftClick = () => {
    if (desplazamiento < 0) {
      setDesplazamiento(desplazamiento + maxDesplazamiento);
    } else {
      setDesplazamiento(-maxDesplazamiento * (datos2.length - 1));
    }
  };

  return (
    <section className="relative w-full h-screen flex overflow-hidden z-20" aria-label="Información sobre salud mental">
      <div className="flex transform transition-transform duration-300 ease-in-out" style={{ transform: `translateX(${desplazamiento}%)` }}>
        {datos2.map((item, idx) => (
          <div key={idx} className="flex w-screen justify-center items-center">
            <div className='w-[90%] md:w-[80%] h-[70%] rounded-3xl gap-10 shadow-xl shadow-slate-200 flex flex-col md:flex-row items-center justify-center bg-white/90 backdrop-blur p-8'>
              <p className="w-full md:w-2/5 text-xl">{item.texto}</p>
              <img className="w-1/2 md:w-1/4 rounded-lg" src={item.imagen} alt={`Ilustración ${idx + 1}`} />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Anterior"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-600"
        onClick={handleLeftClick}
      >
        <FlechasLEFT style={{ fontSize: '48px' }} />
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-600"
        onClick={handleRightClick}
      >
        <FlechasRIGHT style={{ fontSize: '48px' }} />
      </button>
    </section>
  );
}

Informacion.propTypes = {
  datos2: PropTypes.array.isRequired,
};

export default Informacion;