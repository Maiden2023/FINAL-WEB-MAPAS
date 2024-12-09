/* eslint-disable no-unused-vars */
import { useState } from "react";
import { createUsuario } from "../services/UsuarioService";

const CreateUsuario = () => {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", rol: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(form);
      alert("Usuario creado con éxito");
      window.location.href = "/admin"; // Redirigir al dashboard
    } catch (error) {
      alert("Error al crear usuario");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Crear Usuario</h2>
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
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
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
            Crear Usuario
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

export default CreateUsuario;
