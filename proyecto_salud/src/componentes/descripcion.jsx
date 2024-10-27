import { Link } from 'react-router-dom';
function description(){
    return(
        <section className="h-screen  w-full flex  justify-center items-center bg-[url('https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg')] bg-cover bg-center)">
            <div className='p-3 rounded-lg w-[500px] flex flex-col gap-5 justify-center items-center  shadow-xl shadow-slate-500'>
            <h2 className="font-bold text-4xl"> <span className="text-red-600">Salud</span> mental <span className="text-red-600">uni</span>pamplona</h2>
            <p className="w-[70%] text-xl text-center">Tu salud mental es una prioridad, tu paz interior es tu riqueza, y cuidarte a ti mismo es tu mayor responsabilidad</p>
            <div className="flex justify-center items-center h-28  gap-2">
            <Link className="p-2 h-11 w-32 flex justify-center items-center bg-red-600/95 duration-500 ease-in-out rounded-lg hover:p-3 hover:h-12 hover:w-36 font-medium text-white border-2 border-white" to="/registro-inicio">Iniciar</Link>
                <Link className="p-2 h-11 w-32 flex justify-center items-center bg-red-600/95 duration-500 ease-in-out rounded-lg hover:p-3 hover:h-12 hover:w-36 font-medium text-white border-2 border-white" to="/registro-inicio">Registro</Link>
           
            </div>
            </div>
        </section>
    )
}
export default description;