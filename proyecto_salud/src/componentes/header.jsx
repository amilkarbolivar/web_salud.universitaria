import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/DarkModeOutlined';
import Foro from './foro';

function Header() {
    const variable =true;
    return (
        
        <header className=" border-b-2 border-gray-300 z-50 fixed font-medium font-roboto h-12 w-full bg-white flex gap-3 items-center justify-between px-4 md:px-8">
            <h2 className="text-xl cursor-pointer flex items-center">
                <Link to="/" className="flex items-center">
                    Uni<span className="text-red-600">men</span>tal
                </Link>
            </h2>
            <nav className="flex h-full gap-4">

                <Link className="hover:bg-red-600/95 rounded-sm flex items-center p-2 cursor-pointer" to="/conoce-tu-salud">Conoce tu salud</Link>
                <Link className="hover:bg-red-600/95 rounded-sm flex items-center p-2 cursor-pointer" to="/informate-ya">Informate Ya</Link>
                <Link className="hover:bg-red-600/95 rounded-sm flex items-center p-2 cursor-pointer" to="/foros">Foros</Link>
                <Link className="hover:bg-red-600/95 rounded-sm flex items-center p-2 cursor-pointer" to="/directorio-de-salud">Directorio de Salud</Link>
                <Link className="hover:bg-red-600/95 rounded-sm flex items-center p-2 cursor-pointer" to="/registro-inicio">Registro/Inicio</Link>
            </nav>
        </header>
    );
}

export default Header;

