import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './componentes/header';
import Video from './componentes/video_inicio';
import datos from './data/datos_tarjetas.json';
import Description from './componentes/descripcion';
import datos2 from './data/datos_videos.json';
import Informacion from './componentes/informacion';
import Salud from './componentes/conoce_tusalud';
import Infya from './componentes/informateya';
import formulario from './data/formulario.json';
import Foro from './componentes/foro';
import Directorio from './componentes/directorio';
import Inicio from './componentes/iniciar';
import Footer from './componentes/footer';
import { UserProvider } from './context/UserContext'; // Importar el UserProvider

function App() {
  return (
    <div className="">
      <UserProvider> {/* Proveedor de contexto de usuario */}
        <Router>
          <Header />
          <main className="py-10">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Description />
                    <Informacion datos2={datos2.informacion} />
                    <Video
                      titulo={datos.videos.video1.title}
                      paragraph={datos.videos.video1.paragraph}
                      iframeUrl={datos.videos.video1.iframeUrl}
                    />
                  </>
                }
              />
              <Route path="/conoce-tu-salud" element={<Salud form={formulario.cuestionarios} />} />
              <Route path="/informate-ya" element={<Infya />} />
              <Route path="/foros" element={<Foro />} />
              <Route path="/directorio-de-salud" element={<Directorio />} />
              <Route path="/registro-inicio" element={<Inicio />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
