import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useUser } from "../context/UserContext"; // Importar el hook del contexto

function Inicio() {
  const [isRegister, setIsRegister] = useState(false);
  const { user, updateUser } = useUser(); // Usar el contexto
  const navigate = useNavigate(); // Crear el hook de navegación

  const [formData, setFormData] = useState({
    apodo: "",
    correo: "",
    contraseña: "",
    nombre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { apodo, correo, contraseña, nombre } = formData;

    if (isRegister && !apodo.trim()) {
      alert("El campo 'Apodo' no puede estar vacío.");
      return false;
    }
    if (isRegister && !nombre.trim()) {
      alert("El campo 'Nombre' no puede estar vacío.");
      return false;
    }
    if (!correo.trim()) {
      alert("El campo 'Correo' no puede estar vacío.");
      return false;
    }
    if (!contraseña.trim()) {
      alert("El campo 'Contraseña' no puede estar vacío.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isRegister) {
        const usuario = {
          ...formData,
          cargo: "usuario",
          fecha_creacion: new Date().toLocaleDateString("es-ES"),
        };

        try {
          const response = await fetch("http://localhost:8080/api/v1/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          });

          if (response.ok) {
          
            updateUser(usuario); // Actualizar el usuario en el contexto
            setFormData({ apodo: "", correo: "", contraseña: "", nombre: "" });
            navigate("/"); // Redirigir al inicio después de un registro exitoso
          } else {
            alert("Error al registrar el usuario.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("No se pudo conectar con el servidor.");
        }
      } else {
        try {
          const response = await fetch("http://localhost:8080/api/v1/usuarios");
          if (response.ok) {
            const usuarios = await response.json();
            const usuario = usuarios.find(
              (user) =>
                user.correo === formData.correo &&
                user.contraseña === formData.contraseña
            );

            if (usuario) {
            
              updateUser(usuario); // Actualizar el usuario en el contexto
              navigate("/"); // Redirigir al inicio después de un inicio de sesión exitoso
            } else {
              alert("Correo o contraseña incorrectos.");
            }
          } else {
            alert("Error al consultar los usuarios.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("No se pudo conectar con el servidor.");
        }
      }
    }
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setFormData({ apodo: "", correo: "", contraseña: "", nombre: "" });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {isRegister ? (
        <form
          className="flex flex-col p-8 bg-white shadow-2xl rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrarse</h2>
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Apodo"
            name="apodo"
            value={formData.apodo}
            onChange={handleChange}
          />
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            Registrarse
          </button>
          <p className="mt-4 text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              className="text-blue-600 font-bold hover:underline"
              onClick={toggleForm}
            >
              Iniciar sesión
            </button>
          </p>
        </form>
      ) : (
        <form
          className="flex flex-col p-8 bg-white shadow-2xl rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            className="w-64 p-4 mb-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            Iniciar sesión
          </button>
          <p className="mt-4 text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <button
              type="button"
              className="text-blue-600 font-bold hover:underline"
              onClick={toggleForm}
            >
              Regístrate
            </button>
          </p>
        </form>
      )}
    </section>
  );
}

export default Inicio;
