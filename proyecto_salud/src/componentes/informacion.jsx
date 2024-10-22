import { useState } from 'react';
import FlechasLEFT from '@mui/icons-material/ArrowLeft';
import FlechasRIGHT from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';

function Informacion({ datos2 }) {
    const [desplazamiento, setDesplazamiento] = useState(0); // Estado para el desplazamiento
    const maxDesplazamiento =100/(datos2.length) ; // Calcular el máximo desplazamiento
console.log("sss: "+desplazamiento+"ssssss"+maxDesplazamiento)
    const handleRightClick = () => {
        if (desplazamiento != -75) {
            setDesplazamiento( desplazamiento- maxDesplazamiento);
        } else {
            console.log("Desplazamiento bloqueado");
        }
    };

    const handleLeftClick = () => {
        if (desplazamiento < 0) {
            setDesplazamiento(desplazamiento + maxDesplazamiento);
        } else {
            console.log("Desplazamiento bloqueado");
        }
    };

    return (
        <section className="relative w-full h-screen flex ">
            <div className="flex transform transition-transform duration-300 ease-in-out" style={{ transform: `translateX(${desplazamiento}%)` }}>
                {datos2.map((item, idx) => (
                    <div key={idx} className="flex w-screen justify-center items-center gap-10">
                        <p className="w-2/5 text-xl">{item.texto}</p>
                        <img className="w-1/4 rounded-lg" src={item.imagen} alt={`imagen-${idx}`} />
                    </div>
                ))}
            </div>

            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-600" onClick={handleLeftClick}>
                <FlechasLEFT style={{ fontSize: '60px' }} />
            </span>
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-600" onClick={handleRightClick}>
                <FlechasRIGHT style={{ fontSize: '60px' }} />
            </span>
        </section>
    );
}

Informacion.propTypes = {
    datos2: PropTypes.array.isRequired // Cambiado de string a array
};

export default Informacion;
