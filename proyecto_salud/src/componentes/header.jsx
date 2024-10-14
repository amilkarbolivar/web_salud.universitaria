
function Header() {
    return (
        <header className="font-medium font-roboto h-12 w-full bg-transparent flex gap-3 items-center justify-between ">
            <h2 className="text-xl h-full flex items-center justify-center pr-3 pl-3 ">Uni<span className="text-red-600">men</span>tal</h2>
            <ol className="flex  h-full gap-4 ">
                <li className=" hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer">Conoce tu Salud</li>
                <li className="hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer">Informate Ya</li>
                <li className="hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer">Foros</li>
                <li className="hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer">Directorio de salud</li>
                <li className="hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer"><span className="material-icons-outlined">
                   light_mode
            </span></li>
            <li className="hover:bg-red-600/95 flex items-center justify-center pr-3 pl-3 cursor-pointer">Registrar/Inicio</li>
        </ol>
    </header>
    )
  }
  
  export default Header;