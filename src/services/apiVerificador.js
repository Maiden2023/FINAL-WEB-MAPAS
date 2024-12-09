import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Función para crear un municipio
export const createMunicipio = async (municipio) => {
  try {
    const response = await api.post("/municipios", municipio);
    return response.data; // Devolver la respuesta de la API
  } catch (error) {
    console.error("Error al crear el municipio:", error);
    throw error; // Propagar el error
  }
};

// Función para listar municipios
export const listMunicipios = async () => {
  try {
    const response = await api.get("/municipios");
    return response.data.data; // Devolver solo el arreglo `data`
  } catch (error) {
    console.error("Error al obtener municipios:", error);
    throw error;
  }
};

// Función para actualizar un municipio
export const updateMunicipio = async (id, municipio) => {
  try {
    const response = await api.put(`/municipios/${id}`, municipio);
    return response.data; // Devolver la respuesta de la API
  } catch (error) {
    console.error(`Error al actualizar el municipio con ID ${id}:`, error);
    throw error;
  }
};

// Función para eliminar un municipio
export const deleteMunicipio = async (id) => {
  try {
    await api.delete(`/municipios/${id}`);
    return { success: true }; // Devolver confirmación
  } catch (error) {
    console.error(`Error al eliminar el municipio con ID ${id}:`, error);
    throw error;
  }
};

// Función para crear una carretera
export const createCarretera = async (carretera) => {
  try {
    const response = await api.post("/carreteras", carretera);
    return response.data; // Devolver la respuesta de la API
  } catch (error) {
    console.error("Error al crear la carretera:", error);
    throw error;
  }
};

// Función para listar carreteras
export const listCarreteras = async () => {
  try {
    const response = await api.get("/carreteras");
    return response.data.data; // Devolver solo el arreglo `data`
  } catch (error) {
    console.error("Error al obtener carreteras:", error);
    throw error;
  }
};

// Función para actualizar una carretera
export const updateCarretera = async (id, carretera) => {
  try {
    const response = await api.put(`/carreteras/${id}`, carretera);
    return response.data; // Devolver la respuesta de la API
  } catch (error) {
    console.error(`Error al actualizar la carretera con ID ${id}:`, error);
    throw error;
  }
};

// Función para eliminar una carretera
export const deleteCarretera = async (id) => {
  try {
    await api.delete(`/carreteras/${id}`);
    return { success: true }; // Devolver confirmación
  } catch (error) {
    console.error(`Error al eliminar la carretera con ID ${id}:`, error);
    throw error;
  }
};

// Función para obtener un municipio por ID
export const getMunicipioById = async (id) => {
  try {
    const response = await api.get(`/municipios/${id}`);
    return response.data.data; // Devolver el objeto municipio
  } catch (error) {
    console.error(`Error al obtener el municipio con ID ${id}:`, error);
    throw error;
  }
};

// Función para obtener una carretera por ID
export const getCarreteraById = async (id) => {
  try {
    const response = await api.get(`/carreteras/${id}`);
    return response.data.data; // Devolver el objeto carretera
  } catch (error) {
    console.error(`Error al obtener la carretera con ID ${id}:`, error);
    throw error;
  }
};


