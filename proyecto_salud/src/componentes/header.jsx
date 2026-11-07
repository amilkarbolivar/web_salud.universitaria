import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { apiFetch } from '../services/api';

function Header() {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await apiFetch('/api/v1/auth/logout', { method: 'POST' });
    } catch {
      // Aun si falla el servidor, limpiamos la sesión local.
    } finally {
      clearUser();
      setLoggingOut(false);
      navigate('/');
    }
  };

  return (
    <header className="border-b border-gray-200 z-50 fixed w-full bg-white/80 backdrop-blur-md font-medium">
      <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center">
          <Link to="/" className="flex items-center gap-1">
            Uni<span className="text-red-600">mental</span>
          </Link>
        </h2>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition" to="/conoce-tu-salud">Conoce tu salud</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition" to="/informate-ya">Informate Ya</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition" to="/foros">Foros</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition" to="/directorio-de-salud">Directorio</Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-700">
                Hola, <span className="font-semibold text-red-600">{user.nombre}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-60"
              >
                {loggingOut ? 'Saliendo...' : 'Cerrar sesión'}
              </button>
            </>
          ) : (
            <Link
              to="/registro-inicio"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {/* Navegación móvil */}
      <nav className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto text-xs">
        <Link className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 whitespace-nowrap" to="/conoce-tu-salud">Conoce tu salud</Link>
        <Link className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 whitespace-nowrap" to="/informate-ya">Informate Ya</Link>
        <Link className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 whitespace-nowrap" to="/foros">Foros</Link>
        <Link className="px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 whitespace-nowrap" to="/directorio-de-salud">Directorio</Link>
      </nav>
    </header>
  );
}

export default Header;