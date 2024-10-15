import PropTypes from 'prop-types';

function Video({ titulo, paragraph, iframeUrl }) { // Desestructurando las props
    return (
        <>
            <section className="flex justify-center items-center mt-[-2%]  w-full p-10 gap-20 h-screen">
                <div className="mt-10 flex flex-col justify-center items-center w-[35%] line gap-24">
                    <h2 className="text-4xl font-bold">{titulo}</h2>
                    <p className="text-lg">{paragraph}</p> {/* Mostrar el párrafo */}
                </div>
                <iframe 
                    width="560" 
                    height="315" 
                    src={iframeUrl} // Usar la URL del iframe desde las props
                    title={titulo} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                ></iframe>
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
