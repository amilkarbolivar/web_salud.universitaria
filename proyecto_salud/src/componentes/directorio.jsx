import { useState } from 'react';

function Directorio() {
    const [searchTerm, setSearchTerm] = useState('');

    // Datos de ejemplo para el directorio
    const healthDirectory = [
        { name: 'Dr. Juan Pérez', specialty: 'Cardiología', location: 'Clínica ABC' },
        { name: 'Dra. Ana Gómez', specialty: 'Pediatría', location: 'Hospital XYZ' },
        { name: 'Centro de Salud Mental', specialty: 'Psicología', location: 'Av. Central 123' },
        { name: 'Fisioterapia Integral', specialty: 'Fisioterapia', location: 'Centro Médico La Paz' },
    ];

    // Filtrar el directorio según el término de búsqueda
    const filteredDirectory = healthDirectory.filter((entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-semibold mb-6 text-center  mt-10">Directorio de Salud</h2>

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por nombre, especialidad o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Lista de resultados */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Resultados</h3>
                {filteredDirectory.length === 0 ? (
                    <p className="text-gray-500">No se encontraron resultados.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredDirectory.map((entry, index) => (
                            <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h4 className="text-lg font-semibold">{entry.name}</h4>
                                <p className="text-gray-700">Especialidad: {entry.specialty}</p>
                                <p className="text-gray-700">Ubicación: {entry.location}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Directorio;
