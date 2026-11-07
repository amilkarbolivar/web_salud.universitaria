import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { apiJson } from "../services/api";

function Inicio() {
  const [isRegister, setIsRegister] = useState(false);
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    apodo: "",
    correo: "",
    contraseña: "",
    nombre: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    const { apodo, correo, contraseña, nombre } = formData;

    if (isRegister) {
      if (!nombre.trim()) return "El campo 'Nombre' no puede estar vacío.";
      if (!apodo.trim()) return "El campo 'Apodo' no puede estar vacío.";
    }
    if (!correo.trim()) return "El campo 'Correo' no puede estar vacío.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return "El correo no es válido.";
    if (!contraseña.trim()) return "El campo 'Contraseña' no puede estar vacío.";
    if (isRegister && contraseña.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (isRegister) {
        const data = await apiJson("/api/v1/auth/register", {
          method: "POST",
          body: {
            nombre: formData.nombre.trim(),
            apodo: formData.apodo.trim(),
            correo: formData.correo.trim(),
            contraseña: formData.contraseña,
          },
        });
        updateUser(data.user);
        setFormData({ apodo: "", correo: "", contraseña: "", nombre: "" });
        navigate("/");
      } else {
        const data = await apiJson("/api/v1/auth/login", {
          method: "POST",
          body: {
            correo: formData.correo.trim(),
            contraseña: formData.contraseña,
          },
        });
        updateUser(data.user);
        setFormData({ apodo: "", correo: "", contraseña: "", nombre: "" });
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setFormData({ apodo: "", correo: "", contraseña: "", nombre: "" });
    setError("");
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      {isRegister ? (
        <form className="flex flex-col p-8 bg-white shadow-2xl rounded-lg w-full max-w-sm" onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrarse</h2>
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Apodo"
            name="apodo"
            value={formData.apodo}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          {error && <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Registrarse"}
          </button>
          <p className="mt-4 text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <button type="button" className="text-blue-600 font-bold hover:underline" onClick={toggleForm}>
              Iniciar sesión
            </button>
          </p>
        </form>
      ) : (
        <form className="flex flex-col p-8 bg-white shadow-2xl rounded-lg w-full max-w-sm" onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar sesión</h2>
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {error && <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Iniciar sesión"}
          </button>
          <p className="mt-4 text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <button type="button" className="text-blue-600 font-bold hover:underline" onClick={toggleForm}>
              Regístrate
            </button>
          </p>
        </form>
      )}
    </section>
  );
}

export default Inicio;