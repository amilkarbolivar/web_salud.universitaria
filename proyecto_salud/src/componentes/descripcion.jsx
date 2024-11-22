import { Link } from 'react-router-dom';

function Description() {
  return (
    <section className="h-screen w-full flex justify-center items-center bg-[url('https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg')] bg-cover bg-center">
      <div className="p-6 bg-white/90 rounded-xl w-[500px] flex flex-col gap-6 justify-center items-center shadow-2xl shadow-gray-700">
        <h2 className="font-bold text-4xl text-gray-800 text-center">
          <span className="text-red-600">Salud</span> Mental <span className="text-red-600">Uni</span>Pamplona
        </h2>
        <p className="w-[80%] text-lg text-gray-600 text-center leading-relaxed">
          Tu salud mental es una prioridad, tu paz interior es tu riqueza, y cuidarte a ti mismo es tu mayor responsabilidad.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link
            className="px-6 py-2 bg-red-600/90 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300"
            to="/registro-inicio"
          >
            Iniciar
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Description;
