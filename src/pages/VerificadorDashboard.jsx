import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import {
  createMunicipio,
  listMunicipios,
  updateMunicipio,
  deleteMunicipio,
} from "../services/apiVerificador";
import { Table, Button } from "react-bootstrap";


const AdminDashboard = () => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: -17.78629,
    lng: -63.18117,
  };

  const [municipios, setMunicipios] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [createCoord, setCreateCoord] = useState(null);
  const [editCoord, setEditCoord] = useState(null);
  const [editingMunicipio, setEditingMunicipio] = useState(null);

  // Cargar municipios al montar el componente
  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const municipiosData = await listMunicipios();
        const filteredData = municipiosData.filter(
          (m) => m.coordenadas && m.coordenadas.coordinates
        );
        setMunicipios(filteredData);
      } catch (error) {
        console.error("Error al cargar municipios:", error);
      }
    };
    fetchMunicipios();
  }, []);


  // Manejo de formulario de creación
  const handleCreateMunicipio = () => {
    setShowCreateForm(true);
    setShowEditForm(false);
    setCreateCoord(null); // Limpiar coordenadas al crear
  };

  // Manejo de formulario de edición
  const handleEditMunicipio = (municipio) => {
    setEditingMunicipio(municipio);
    setShowEditForm(true);
    setShowCreateForm(false);
    setEditCoord({
      lat: municipio.coordenadas.coordinates[1],
      lng: municipio.coordenadas.coordinates[0],
    });
  };

  // Guardar un nuevo municipio
  const handleSaveMunicipio = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;

    try {
      const municipio = {
        nombre,
        coordenadas: {
          type: "Point",
          coordinates: [createCoord.lng, createCoord.lat],
        },
      };
      const savedMunicipio = await createMunicipio(municipio);
      setMunicipios((prev) => [...prev, savedMunicipio]);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error al guardar el municipio:", error);
    }
  };

  // Actualizar municipio existente
  const handleUpdateMunicipio = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;

    try {
      const updatedMunicipio = {
        ...editingMunicipio,
        nombre,
        coordenadas: {
          type: "Point",
          coordinates: [editCoord.lng, editCoord.lat],
        },
      };
      await updateMunicipio(editingMunicipio.id, updatedMunicipio);
      setMunicipios((prev) =>
        prev.map((m) => (m.id === editingMunicipio.id ? updatedMunicipio : m))
      );
      setShowEditForm(false);
    } catch (error) {
      console.error("Error al actualizar el municipio:", error);
    }
  };

  // Eliminar municipio
  const handleDeleteMunicipio = async (id) => {
    try {
      await deleteMunicipio(id);
      setMunicipios((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error al eliminar el municipio:", error);
    }
  };

  return (

    <div className="container mt-3">
      <br />
      <br />
      <br />
      <ul className="nav nav-pills" role="tablist">

        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="pill"
            data-bs-target="#gestionMunicipios"
          >
            municipios
          </button>
        </li>
      </ul>
      <br />
      <h2>Panel de Administrador</h2>
      <br />
      <div id="gestionMunicipios" className="tab-pane fade">
      <Button className="mb-3" onClick={handleCreateMunicipio}>
        Crear Municipio
      </Button>
      {municipios.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Coordenadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {municipios.map((municipio) => (
              <tr key={municipio.id}>
                <td>{municipio.id}</td>
                <td>{municipio.nombre}</td>
                <td>
                  {municipio.coordenadas?.coordinates
                    ? `${municipio.coordenadas.coordinates[1]}, ${municipio.coordenadas.coordinates[0]}`
                    : "Coordenadas no disponibles"}
                </td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditMunicipio(municipio)}
                  >
                    Editar un municipio
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteMunicipio(municipio.id)}
                  >
                    Eliminar un municipio
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay municipios registrados.</p>
      )}

      {/* Formulario de Crear Municipio */}
      {showCreateForm && (
        <>
          <h3>Crear Municipio</h3>
          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={createCoord || defaultCenter}
                zoom={6}
                onClick={(e) => {
                  const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                  setCreateCoord(newPoint);
                }}
              >
                {createCoord && (
                  <Marker position={createCoord} label="Nuevo Municipio" />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          <form className="mt-3" onSubmit={handleSaveMunicipio}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Coordenadas</label>
              <input
                type="text"
                className="form-control"
                value={`${createCoord?.lat || ""}, ${createCoord?.lng || ""}`}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-success">
              Guardar Municipio
            </button>
          </form>
        </>
      )}

      {/* Formulario de Editar Municipio */}
      {showEditForm && (
        <>
          <h3>Editar Municipio</h3>
          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={editCoord || defaultCenter}
                zoom={6}
                onClick={(e) => {
                  const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                  setEditCoord(newPoint);
                }}
              >
                {editCoord && (
                  <Marker position={editCoord} label="Editar Municipio" />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          <form className="mt-3" onSubmit={handleUpdateMunicipio}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={editingMunicipio?.nombre || ""}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Coordenadas</label>
              <input
                type="text"
                className="form-control"
                value={`${editCoord?.lat || ""}, ${editCoord?.lng || ""}`}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-success">
              Actualizar Municipio
            </button>
          </form>
        </>
        )}
      </div>
      <div id="gestionCarreteras" className="tab-pane fade">
        <h1>carete</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
