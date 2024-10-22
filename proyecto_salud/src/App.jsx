import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './componentes/header';
import Video from './componentes/video_inicio';
import datos from './data/datos_tarjetas.json';
import Description from './componentes/descripcion';
import datos2 from './data/datos_videos.json';
import Informacion from './componentes/informacion';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={
                    <>
                    <Description />
                    <Informacion datos2={datos2.informacion} />
                    <Video titulo={datos.videos.video1.title} paragraph={datos.videos.video1.paragraph} iframeUrl={datos.videos.video1.iframeUrl} />
                    </>
            } />
                <Route path="/conoce-tu-salud" element={<div>conoce tu salud</div>} />
                <Route path="/informate-ya" element={<div>informacion</div>} />
                <Route path="/foros" element={<div>Foros Component</div>} />
                <Route path="/directorio-de-salud" element={<div>Directorio de Salud Component</div>} />
                <Route path="/registro-inicio" element={<div>Registro/Inicio Component</div>} />
            </Routes>
        </Router>
    );
}

export default App;

