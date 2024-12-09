import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const createUsuario = async (usuario) => {
  try {
    const response = await api.post("/usuarios", usuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};
export const updateUsuario = async (id, usuario) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};


// Funciones para interactuar con las API
export const listCarreteras = async () => {
  try {
    const response = await api.get("/carreteras");
    return response.data.data; // Devolver solo el arreglo `data`
  } catch (error) {
    console.error("Error al obtener carreteras:", error);
    throw error; // Propagar el error al componente
  }
};

export const listIncidentes = async () => {
  try {
    const response = await api.get("/incidentes");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener incidentes:", error);
    throw error;
  }
};

export const listMunicipios = async () => {
  try {
    const response = await api.get("/municipios");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener municipios:", error);
    throw error;
  }
};

export const listUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");
    return response.data.data; // Devolver el arreglo `data` de usuarios
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data; // Devolver la respuesta completa si es necesario
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

export default api;
