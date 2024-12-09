import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUsuarioList, deleteUsuario } from "../services/UsuarioService";
import moment from "moment";

const AdminDashboard = () => {
  const [usuarioList, setUsuarioList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    fetchListaUsuarios();
  }, []);

  // Función para obtener la lista de usuarios desde la API
  const fetchListaUsuarios = async () => {
    try {
      setIsLoading(true);
      const res = await getUsuarioList();
      console.log("Respuesta de la API:", res); // Depuración
      setUsuarioList(res.data); // Asegúrate de acceder a `data` correctamente
    } catch (err) {
      console.error("Error al obtener la lista de usuarios:", err);
      setError("No se pudo cargar la lista de usuarios.");
    } finally {
      setIsLoading(false);
    }
  };
  

  // Función para eliminar un usuario
  const removeUsuario = async (id) => {
    const confirmation = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmation) return;

    try {
      await deleteUsuario(id);
      fetchListaUsuarios(); // Actualiza la lista después de eliminar
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="container mt-3">
      <br />
      <br />
      <ul className="nav nav-pills" role="tablist">
        <li className="nav-item">
          <button
            className="nav-link active"
            data-bs-toggle="pill"
            data-bs-target="#gestionUsuarios"
          >
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#gestionCarreteras"
          >
            Cambiar la Contraseña
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#gestionMunicipios"
          >
            Editar un Usuario
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#gestionIncidentes"
          >
            Ver Cambios de Incidentes
          </button>
        </li>
      </ul>

      <div className="tab-content">
<br />
        {/* Gestión de Usuarios */}
        <div id="gestionUsuarios" className="tab-pane fade show active">
            <h3>Gestión de Usuarios</h3>
            <br />
            <Link className="btn btn-success me-2" to="/usuarios/crear">
              Crear a una Usuario
            </Link>
            <br />
            <br />
            {isLoading ? (
            <p>Cargando usuarios...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : usuarioList && usuarioList.length > 0 ? (

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha de Registro</th>
                    <th>contraseña del usuario</th>
                </tr>
                </thead>
                <tbody>
                {usuarioList.map((usuario) => (
                    <tr key={`usuario-${usuario.id}`}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>

                    <td>{moment.utc(usuario.fechaRegistro).format("DD/MM/YYYY")}</td>
                    <th>{usuario.password}</th>
                    </tr>
                ))}
                </tbody>
            </Table>
            ) : (
            <p>No hay usuarios registrados.</p>
            )}
        </div>

        {/* Cambiar Contraseña */}
        <div id="gestionCarreteras" className="tab-pane fade">
          <h3>Cambiar la Contraseña</h3>
            {isLoading ? (
            <p>Cargando usuarios...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : usuarioList && usuarioList.length > 0 ? (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>contraseña</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {usuarioList.map((usuario) => (
                    <tr key={`usuario-${usuario.id}`}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.password}</td>
                    <td>
                    <Link className="btn btn-primary me-2" to={`/usuarios/editarpass/${usuario.id}`}>
                        Editar la contraseña
                    </Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            ) : (
            <p>No hay usuarios registrados.</p>
            )}
        </div>

        {/* Editar un Usuario */}
        <div id="gestionMunicipios" className="tab-pane fade">
          <h3>Editar un Usuario</h3>
          {isLoading ? (
            <p>Cargando usuarios...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : usuarioList && usuarioList.length > 0 ? (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>contraseña</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {usuarioList.map((usuario) => (
                    <tr key={`usuario-${usuario.id}`}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.password}</td>
                    <td>
                    <Link className="btn btn-primary me-2" to={`/usuarios/editar/${usuario.id}`}>
                        Editar
                        </Link>
                        <Button variant="danger" onClick={() => removeUsuario(usuario.id)}>
                        Eliminar
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            ) : (
            <p>No hay usuarios registrados.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
