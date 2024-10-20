import SettingsIcon from '@mui/icons-material/DarkModeOutlined';
function Header() {
    return (
        <header className="fixed font-medium font-roboto h-12 w-full bg-transparent flex gap-3 items-center justify-between ">
            <h2 className="text-xl cursor-pointer h-full flex items-center justify-center pr-3 pl-3 ">Uni<span className="text-red-600">men</span>tal</h2>
            <ol className="flex  h-full gap-4 ">
            <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer"><span className="material-icons-outlined">
                <SettingsIcon />
            </span></li>
                <li className=" hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">Conoce tu Salud</li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">Informate Ya</li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">Foros</li>
                <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">Directorio de salud</li>
            <li className="hover:bg-red-600/95 rounded-sm flex items-center justify-center pr-3 pl-3 cursor-pointer">Registro/Inicio</li>
        </ol>
    </header>
    )
  }
  
  export default Header;