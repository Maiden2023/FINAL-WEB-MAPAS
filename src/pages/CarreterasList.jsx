import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CarreterasList = () => {
  const [carreteras, setCarreteras] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const deleteCarretera = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/carreteras/${id}`);
      fetchCarreteras(); // Refresca la lista después de eliminar
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error al eliminar la carretera.");
    }
  };

  useEffect(() => {
    fetchCarreteras();
  }, []);

  return (
    <div>
      <h3>Gestión de Carreteras</h3>
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

                <td>
                  <Link to={`/carreteras/crear`} className="btn btn-success me-2">
                    Crear
                  </Link>
                  <Link to={`/carreteras/editar/${carretera.id}`} className="btn btn-primary me-2">
                    Editar
                  </Link>
                  <Button variant="danger" onClick={() => deleteCarretera(carretera.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay carreteras registradas.</p>
      )}
    </div>
  );
};

export default CarreterasList;
