import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsuarioById, updateUsuario } from "../services/UsuarioService";

const EditUsuario = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [form, setForm] = useState({ nombre: "", email: "", rol: "" });

  useEffect(() => {
    // Carga los datos del usuario
    const fetchUsuario = async () => {
      try {
        const usuario = await getUsuarioById(id);
        setForm(usuario);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(id, form);
      alert("Usuario actualizado con éxito");
      window.location.href = "/admin"; // Redirigir al dashboard
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error al actualizar usuario");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol
          </label>
          <input
            type="text"
            className="form-control"
            id="rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => (window.location.href = "/admin")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsuario;
