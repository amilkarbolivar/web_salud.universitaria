function Infya() {
    return (
        <section className="flex gap-5 justify-center items-center h-screen bg-gray-100">
            <input
                type="text"
                placeholder="Buscar..."
                className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            />
                        <button className=" px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">Buscar</button>
        </section>
    );
}

export default Infya;
