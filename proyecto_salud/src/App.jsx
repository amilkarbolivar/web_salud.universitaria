import './index.css';
import Header from './componentes/header';
import Video from './componentes/video_inicio';
import datos from './data/datos_tarjetas.json';
import Description from './componentes/descripcion';


function App() {
    return (
        <> 
            <Header />
            <Description/>
            <Video 
                titulo={datos.videos.video1.title} // Accediendo al título de video1
                paragraph={datos.videos.video1.paragraph} // Accediendo al párrafo de video1
                iframeUrl={datos.videos.video1.iframeUrl} // Accediendo a la URL del iframe
            /> 
            
        </>
    );
}

export default App;
