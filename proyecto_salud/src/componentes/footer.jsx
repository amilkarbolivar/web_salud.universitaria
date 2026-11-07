import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-900">UniMental</p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} UniMental. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Contenido informativo. No sustituye la atención profesional.
          </p>
        </div>

        <div className="flex space-x-4">
          {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Red social"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <Icon fontSize="small" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;