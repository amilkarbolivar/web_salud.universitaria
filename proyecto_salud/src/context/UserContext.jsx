import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUser = useCallback((userData) => {
    if (!userData) {
      setUser(null);
      return;
    }
    // Nunca almacenar contraseñas ni hashes en el cliente.
    const safe = { ...userData };
    delete safe.contraseña;
    delete safe.password;
    delete safe.password_hash;
    setUser(safe);
  }, []);

  const clearUser = useCallback(() => setUser(null), []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
};