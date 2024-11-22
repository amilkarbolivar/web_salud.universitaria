import { createContext, useContext, useState } from "react";

// Crear el contexto de usuario
const UserContext = createContext();

// Crear un proveedor de contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Información del usuario

  // Función para actualizar los datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto de usuario en cualquier componente
export const useUser = () => {
  return useContext(UserContext);
};
