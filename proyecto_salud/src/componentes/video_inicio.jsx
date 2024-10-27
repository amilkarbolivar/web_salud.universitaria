import PropTypes from 'prop-types';

function Video({ titulo, paragraph, iframeUrl }) { 
    
    return (
        <>
            <section className=" w-full p-10 gap-20 h-screen flex justify-center items-center">
                <div className='flex justify-center items-center bg-white h-[80%] rounded-xl shadow-xl shadow-slate-500'>
                <div className=" flex flex-col justify-center items-center w-[35%] line gap-10">
                    <h2 className="text-4xl font-bold text-red-600">{titulo}</h2>
                    <p className="text-lg font-medium">{paragraph}</p> {/* Mostrar el párrafo */}
                </div>
                <iframe 
                    width="560" 
                    height="315" 
                    src={iframeUrl} // Usar la URL del iframe desde las props
                    title={titulo} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                ></iframe>
                </div>
            </section>
        </>
    );
}
Video.propTypes = {
    titulo: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    iframeUrl: PropTypes.string.isRequired,
};

export default Video;
