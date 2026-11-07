import { Link } from 'react-router-dom';

function Description() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-500/60 to-rose-400/60" />
      <img
        src="https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative z-10 max-w-2xl mx-4 p-8 md:p-10 bg-white/85 backdrop-blur rounded-3xl shadow-2xl flex flex-col gap-6 items-center text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wide">
          Bienestar universitario
        </span>
        <h2 className="font-bold text-4xl md:text-5xl text-gray-900 leading-tight">
          Tu salud mental es <span className="text-red-600">prioridad</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          UniMental es una plataforma educativa que te acompaña a mejorar tu vida y desarrollar tu bienestar emocional.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            className="px-6 py-3 bg-red-600 text-white font-medium text-lg rounded-xl shadow-lg hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300"
            to="/registro-inicio"
          >
            Comenzar
          </Link>
          <Link
            className="px-6 py-3 bg-white text-gray-800 font-medium text-lg rounded-xl shadow hover:bg-gray-50 transition-all duration-300"
            to="/informate-ya"
          >
            Explorar recursos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Description;