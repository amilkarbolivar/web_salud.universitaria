import PropTypes from 'prop-types';

function Video({ titulo, paragraph, iframeUrl }) {
  return (
    <section className="w-full px-4 py-16 flex justify-center items-center bg-gradient-to-b from-white to-gray-50">
      <div className='flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200 p-8 md:p-10'>
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">{titulo}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{paragraph}</p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={iframeUrl}
              title={titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
Video.propTypes = {
  titulo: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  iframeUrl: PropTypes.string.isRequired,
};

export default Video;