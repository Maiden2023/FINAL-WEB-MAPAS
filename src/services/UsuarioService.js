import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios"; // Asegúrate de que esta URL coincida con tu API

export const getUsuarioList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/usuarios");
      console.log("Respuesta del servicio:", response.data);
      return response.data; // Ajusta según la estructura del JSON
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      throw error;
    }
  };
  

  export const getUsuarioById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  };
  
  export const createUsuario = async (usuario) => {
    try {
      const response = await axios.post(API_URL, usuario);
      return response.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  };
  
  export const updateUsuario = async (id, usuario) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, usuario);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  };
  
  export const deleteUsuario = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  };
  export const listMunicipios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/municipios");
      return response.data; // Ajusta según la estructura de tu API
    } catch (error) {
      console.error("Error al obtener municipios:", error);
      throw error;
    }
  };