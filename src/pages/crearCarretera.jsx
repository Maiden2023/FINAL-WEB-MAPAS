import { useState } from "react";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { createCarretera } from "../services/apiVerificador";
import { Button, Form } from "react-bootstrap";

const CrearCarretera = () => {
  const containerStyle = {
    width: "1000px",
    height: "400px",
  };

  const defaultCenter = {
    lat: -16.2902,
    lng: -63.5887,
  };

  const [carreteraData, setCarreteraData] = useState({
    nombre: "",
    estado: "",
    trazado: [],
  });

  const [selectedPoints, setSelectedPoints] = useState([]);

  const handleMapClick = (e) => {
    const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setSelectedPoints((prev) => [...prev, newPoint]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarreteraData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCarretera = async (e) => {
    e.preventDefault();

    const coordinates = selectedPoints.map((point) => [point.lng, point.lat]);

    const newCarretera = {
      ...carreteraData,
      trazado: {
        type: "LineString",
        coordinates: coordinates,
      },
    };

    try {
      const response = await createCarretera(newCarretera);
      console.log("Carretera creada exitosamente:", response);
      alert("Carretera creada exitosamente");
      // Limpia el formulario
      setCarreteraData({ nombre: "", estado: "", trazado: [] });
      setSelectedPoints([]);
    } catch (error) {
      console.error("Error al crear la carretera:", error);
      alert("Error al crear la carretera");
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <h3>Crear Carretera</h3>
      <div className="map-container mb-3">
        <br />
        <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={6}
            onClick={handleMapClick}
          >
            {selectedPoints.length > 0 && (
              <Polyline
                path={selectedPoints}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <Form onSubmit={handleSaveCarretera}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={carreteraData.nombre}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            name="estado"
            value={carreteraData.estado}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione el estado</option>
            <option value="Abierta">Abierta</option>
            <option value="No transitable por conflictos sociales">No transitable por conflictos sociales</option>
            <option value="Cerrada">Restrinccion vehicular</option>
            <option value="No transitable trafico cerrado">No transitable trafico cerrado</option>
            <option value="Restriccion vehicular, especial">Restriccion vehicular, especial</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Trazado</Form.Label>
          <Form.Control
            type="text"
            value={selectedPoints.map(
              (point) => `${point.lat}, ${point.lng}`
            )}
            readOnly
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Guardar Carretera
        </Button>
      </Form>
    </div>
  );
};

export default CrearCarretera;
