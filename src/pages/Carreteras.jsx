import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [carreteras, setCarreteras] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores

  const fetchCarreteras = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/carreteras");
      setCarreteras(response.data.data);
      setIsLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error al cargar las carreteras.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarreteras();
  }, []);
  
  const deleteCarretera = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carreteras/${id}`);
      fetchCarreteras(); // Refresca la lista después de eliminar
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error al eliminar la carretera.");
    }
  };

  return (
    <div className="container mt-3">
      <br />
      <br />
      <ul className="nav nav-pills" role="tablist">
        <li className="nav-item">
          <br />
          <button
            className="nav-link active"
            data-bs-toggle="pill"
            data-bs-target="#gestionUsuarios"
          >
            Lista de Carreteras
          </button>
        </li>
        <li className="nav-item">
          <br />
          <button
            className="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#gestionCarreteras"
          >
            Editar y Eliminar Carreteras
          </button>
        </li>
      </ul>

      <div className="tab-content">
<br />
        {/* Gestión de Usuarios */}
        <div id="gestionUsuarios" className="tab-pane fade show active">
            <h3>Lista de carreteras </h3>
            <br />
            <Link className="btn btn-success me-2" to="/carretera/crear">
              Crear a una carretera
            </Link>
            <br />
            <br />
            {isLoading ? (
            <p>Cargando carreteras...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : carreteras.length > 0 ? (

            <Table striped bordered hover>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>

                </tr>
                </thead>
                <tbody>
                {carreteras.map((carretera) => (
                    <tr key={carretera.id}>
                    <td>{carretera.id}</td>
                    <td>{carretera.nombre}</td>
                    <td>{carretera.estado}</td>
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
        <h3>Lista de carreteras </h3>
            <br />
            <br />
            {isLoading ? (
            <p>Cargando carreteras...</p>
            ) : error ? (
            <p className="text-danger">{error}</p>
            ) : carreteras.length > 0 ? (

            <Table striped bordered hover>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>

                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {carreteras.map((carretera) => (
                    <tr key={carretera.id}>
                    <td>{carretera.id}</td>
                    <td>{carretera.nombre}</td>
                    <td>{carretera.estado}</td>

                    <th>
                      <Link to={`/carretera/editar/${carretera.id}`} className="btn btn-primary me-2">
                        Editar carreteras
                      </Link>
                      <Button variant="danger" onClick={() => deleteCarretera(carretera.id)}>
                        Eliminar carreteras
                      </Button></th>
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
