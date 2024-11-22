import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function footer() {
  return (
    <footer className="border-2 border-gray-400 text-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Texto de copyright */}
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} UniMental. Todos los derechos reservados.
        </p>

        {/* Redes sociales */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition duration-300"
          >
            <Facebook fontSize="medium" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition duration-300"
          >
            <Twitter fontSize="medium" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition duration-300"
          >
            <Instagram fontSize="medium" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition duration-300"
          >
            <LinkedIn fontSize="medium" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default footer;
