
function description(){
    return(
        <section className="h-screen  w-full flex flex-col justify-center items-center gap-12 ">
            <h2 className="font-bold text-4xl">Salud Mental <span className="text-red-600">uni</span>pamplona</h2>
            <p className="w-[45%] text-xl text-center">Tu salud mental es una prioridad, tu paz interior es tu riqueza, y cuidarte a ti mismo es tu mayor responsabilidad</p>
            <div className="flex justify-center items-center h-28  gap-2">
                <button className="p-2 h-11 bg-red-600/95 duration-500 ease-in-out hover:p-3 hover:h-12 rounded-lg font-medium">Iniciar Secion</button>
                <button className="p-2 h-11 bg-red-600/95 duration-500 ease-in-out rounded-lg hover:p-3 hover:h-12 font-medium">Registrarse</button>
            </div>
        </section>
    )
}
export default description;