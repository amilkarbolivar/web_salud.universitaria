function inicio (){
    return(
        <section className="h-screen flex flex-col justify-center items-center">
            <input className="w-64 p-4 mb-6 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" type="text" placeholder="Correo" name="correo" />
            <input className="w-64 p-4 mb-6 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 " placeholder="Contraseña" type="password" name="contraseña"/>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600">Iniciar</button>
        </section>
    );
}
export default inicio;