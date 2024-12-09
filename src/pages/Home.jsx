import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";
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
  const [filteredRoutes, setFilteredRoutes] = useState([]); // Rutas filtradas
  const [selectedRoute, setSelectedRoute] = useState(null); // Ruta seleccionada
  const [search, setSearch] = useState(""); // Texto de búsqueda

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/carreteras");
        const routesData = response.data.data;

        const processedRoutes = routesData.map((route) => ({
          id: route.id,
          name: route.nombre,
          estado: route.estado,
          motivo: route.motivo,
          points: route.coordenadas.map((coord) => ({
            lat: coord[1],
            lng: coord[0],
          })),
          origen: route.origen,
          destino: route.destino,
        }));

        setRoutes(processedRoutes);
        setFilteredRoutes(processedRoutes); // Inicialmente mostrar todas las rutas
      } catch (error) {
        console.error("Error al obtener rutas:", error);
      }
    };

    fetchRoutes();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    // Filtrar rutas por nombre, origen o destino
    const filtered = routes.filter(
      (route) =>
        route.name.toLowerCase().includes(value) ||
        route.origen.toLowerCase().includes(value) ||
        route.destino.toLowerCase().includes(value)
    );

    setFilteredRoutes(filtered);
  };

  return (
    <div className="home-container">
      <br />
      <br />
      <br />
      {/* Encabezado */}
      <header className="navbar">
        <h1>Transporte</h1>
        <nav>
          <a href="/">Inicio</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      {/* Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre, origen o destino"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Mapa */}
      <div className="map-container">
        <br />
        <br />
        <h2>Mapa de Carreterrrras</h2>
        <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
            {selectedRoute && (
              <>
                <Marker
                  position={selectedRoute.points[0]}
                  label="A"
                  title={`Origen: ${selectedRoute.origen}`}
                />
                <Marker
                  position={selectedRoute.points[selectedRoute.points.length - 1]}
                  label="B"
                  title={`Destino: ${selectedRoute.destino}`}
                />
                <Polyline
                  path={selectedRoute.points}
                  options={{
                    strokeColor:
                      selectedRoute.estado === "bloqueada" ? "#FF0000" : "#008000",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  }}
                />
              </>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Tabla de Carreteras */}
      <div className="table-container">
        <h3>Lista de Carretetttras</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Origen</th>
              <th>Destino</th>
              <th>Nombre Carretera</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id}>
                <td>{route.origen}</td>
                <td>{route.destino}</td>
                <td>{route.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedRoute(route)}
                  >
                    ver carretera
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedRoute(route)}
                  >
                    ver motivo
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
