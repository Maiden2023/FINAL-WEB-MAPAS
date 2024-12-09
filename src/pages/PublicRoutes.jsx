import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./Home.css";

const containerStyle = {
  width: "1000px",
  height: "400px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const center = {
  lat: -16.2902,
  lng: -63.5887,
};

const Home = () => {
  const [routes, setRoutes] = useState([]); // Rutas completas desde la API
  const [municipios, setMunicipios] = useState([]); // Lista de municipios
  const [filteredRoutes, setFilteredRoutes] = useState([]); // Rutas filtradas
  const [selectedRoute, setSelectedRoute] = useState(null); // Ruta seleccionada
  const [selectedMunicipio, setSelectedMunicipio] = useState(null); // Municipio seleccionado
  const [mapCenter, setMapCenter] = useState(center); // Centro del mapa
  const [showAllRoutes, setShowAllRoutes] = useState(false); // Mostrar todas las rutas
  const [showAllMunicipios, setShowAllMunicipios] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false); // Mostrar/ocultar el modal
  const [incidentDetails, setIncidentDetails] = useState(""); // Detalle del incidente
  const [incidentPhoto, setIncidentPhoto] = useState(null); // Foto del incidente
  const [selectedRouteForIncident, setSelectedRouteForIncident] = useState(null); // Ruta asociada al incidente

  useEffect(() => {
    // nas  carreteras
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/carreteras");
        const routesData = response.data.data;

        const processedRoutes = routesData.map((route) => ({
          id: route.id,
          name: route.nombre,
          estado: route.estado,
          motivo: route.motivo,
          points: route.trazado?.coordinates.map((coord) => ({
            lat: coord[1],
            lng: coord[0],
          })),
          origen: route.origen,
          destino: route.destino,
        }));

        setRoutes(processedRoutes);
        setFilteredRoutes(processedRoutes);
      } catch (error) {
        console.error("Error al obtener rutas:", error);
      }
    };

    // ver municipios
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/municipios");
        const municipiosData = response.data.data.map((municipio) => ({
          ...municipio,
          coords: municipio.coordenadas
            ? {
                lat: municipio.coordenadas.coordinates[1],
                lng: municipio.coordenadas.coordinates[0],
              }
            : null,
        }));
        setMunicipios(municipiosData);
      } catch (error) {
        console.error("Error al obtener municipios:", error);
      }
    };

    fetchRoutes();
    fetchMunicipios();
  }, []);

  const handleViewRoute = (route) => {
    setSelectedRoute(route);
    setSelectedMunicipio(null);
    setMapCenter(route.points[0]);
  };

  const handleViewMunicipio = (municipio) => {
    if (municipio.coords) {
      setSelectedMunicipio(municipio); 
      setSelectedRoute(null); 
      setMapCenter(municipio.coords); 
    }
  };

  const handleClearMap = () => {
    setSelectedRoute(false); 
    setSelectedMunicipio(false);
    setShowAllRoutes(false); 
    setShowAllMunicipios(false);
    setMapCenter(center);
  };
  
  const handleShowAllRoutes = () => {
    setShowAllRoutes(true);
    setShowAllMunicipios(false);
    setMapCenter(center);
  };

  const handleShowAllMunicipios = () => {
    setShowAllMunicipios(true);
    setShowAllRoutes(false);
    setMapCenter(center);
  };
  const handleReportIncident = (route) => {
    setSelectedRouteForIncident(route); // Guardar la ruta seleccionada
    setShowIncidentModal(true); // Mostrar el modal
  };
  
  const handleCloseIncidentModal = () => {
    setShowIncidentModal(false); // Cerrar el modal
    setIncidentDetails(""); // Limpiar el detalle
    setIncidentPhoto(null); // Limpiar la foto
  };
  
  const handleIncidentSubmit = async () => {
    if (!incidentDetails || !incidentPhoto) {
      alert("Por favor, proporciona todos los detalles y una foto.");
      return;
    }
  
    const formData = new FormData();
    formData.append("detalle", incidentDetails);
    formData.append("foto", incidentPhoto);
    formData.append("carreteraId", selectedRouteForIncident.id);
  
    try {
      await axios.post("http://localhost:3000/api/incidentes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Incidente reportado exitosamente.");
      handleCloseIncidentModal(); // Cerrar el modal después de enviar
    } catch (error) {
      console.error("Error al enviar el incidente:", error);
      alert("Hubo un error al reportar el incidente.");
    }
  };
  
  return (
    <div className="home-container">
      <br />
      
      {/* Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre, origen o destino"
          onChange={(e) =>
            setFilteredRoutes(
              routes.filter((route) =>
                route.name.toLowerCase().includes(e.target.value.toLowerCase())
              )
            )
          }
          className="search-input"
        />
      </div>

      {/* Mapa */}
      <div className="map-container">
        <h2>Mapa</h2>
        <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={6}>
            {/* Mostrar la carretera seleccionada */}
            {selectedRoute && selectedRoute.points && (
              <Polyline
                path={selectedRoute.points}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                  title:selectedRoute.name
                }}
                title={selectedRoute.name}
              />
            )}

            {/* Mostrar marcadores de municipios */}
            {municipios.map(
              (municipio) =>
                municipio.coords && (
                  <Marker
                    key={municipio.id}
                    position={municipio.coords}
                    title={municipio.nombre}
                  />
                )
            )}

            {/* Mostrar marcador del municipio seleccionado */}
            {selectedMunicipio && selectedMunicipio.coords && (
              <Marker
                position={selectedMunicipio.coords}
                title={`Municipio Seleccionado: ${selectedMunicipio.nombre}`}
              />
            )}
             {/* Mostrar todas las rutas */}
             {showAllRoutes &&
              routes.map((route) =>
                route.points ? (
                  <Polyline
                    key={route.id}
                    path={route.points}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 4,
                    }}
                  />
                ) : null
              )}

            {/* Mostrar todos los municipios */}
            {showAllMunicipios &&
              municipios.map(
                (municipio) =>
                  municipio.coords && (
                    <Marker
                      key={municipio.id}
                      position={municipio.coords}
                      title={municipio.nombre}
                    />
                  )
              )}

          </GoogleMap>
        </LoadScript>
      </div>
      <br />
      {/* Botones de Control */}
      <div className="button-container">
        <button className="btn btn-primary me-2" onClick={handleShowAllMunicipios}>
          Mostrar Todos los Municipios
        </button>
        <button className="btn btn-primary me-2" onClick={handleShowAllRoutes}>
          Mostrar Todas las Carreteras
        </button>
        <button className="btn btn-secondary" onClick={handleClearMap}>
          Limpiar Mapa
        </button>
      </div>

      {/* Tabla de Carreteras */}
      <div className="table-container">
      <Modal show={showIncidentModal} onHide={handleCloseIncidentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reportar Incidente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="incidentDetail" className="form-label">Detalle del Incidente</label>
              <textarea
                id="incidentDetail"
                className="form-control"
                rows="3"
                value={incidentDetails}
                onChange={(e) => setIncidentDetails(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="incidentPhoto" className="form-label">Foto del Incidente</label>
              <input
                type="file"
                id="incidentPhoto"
                className="form-control"
                accept="image/*"
                onChange={(e) => setIncidentPhoto(e.target.files[0])}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIncidentModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleIncidentSubmit}>
            Reportar Incidente
          </Button>
        </Modal.Footer>
      </Modal>

        <h3>Lista de Carreteras</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Origen</th>
              <th>Destino</th>
              <th>Nombre Carretera</th>
              <th>Estado</th>
              <th>Acción</th>
              <th>Reportar incidente</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id}>
                <td>{route.origen}</td>
                <td>{route.destino}</td>
                <td>{route.name}</td>
                <td>{route.estado}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleViewRoute(route)}
                  >
                    Ver Mapa
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleReportIncident(route)}
                  >
                    Reportar Incidente
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de Municipios */}
      <div className="table-container">
        <h3>Lista de Municipios</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Coordenadas</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {municipios.map((municipio) => (
              <tr key={municipio.id}>
                <td>{municipio.id}</td>
                <td>{municipio.nombre}</td>
                <td>
                  {municipio.coords
                    ? `${municipio.coords.lat}, ${municipio.coords.lng}`
                    : "No disponible"}
                </td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleViewMunicipio(municipio)}
                  >
                    Ver Mapa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
