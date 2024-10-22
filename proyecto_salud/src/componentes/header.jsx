import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/DarkModeOutlined';

function Header() {
    return (
        <header className="fixed font-medium font-roboto h-12 w-full bg-transparent flex gap-3 items-center justify-between ">
            <h2 className="text-xl cursor-pointer h-full flex items-center justify-center pr-3 pl-3 ">Uni<span className="text-red-600">men</span>tal</h2>
            <ol className="flex h-full gap-4">
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <span className="material-icons-outlined">
                        <SettingsIcon />
                    </span>
                </li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <Link to="/conoce-tu-salud">Conoce tu Salud</Link>
                </li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <Link to="/informate-ya">Informate Ya</Link>
                </li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <Link to="/foros">Foros</Link>
                </li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <Link to="/directorio-de-salud">Directorio de Salud</Link>
                </li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">
                    <Link to="/registro-inicio">Registro/Inicio</Link>
                </li>
            </ol>
        </header>
    );
}

export default Header;
