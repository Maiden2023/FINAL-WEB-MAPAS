import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Polyline } from "@react-google-maps/api";
import { updateCarretera, getCarreteraById } from "../services/apiVerificador";
import { Button, Form } from "react-bootstrap";

const EditarCarretera = () => {
  const { id } = useParams(); // Obtener el parámetro `id` desde la URL
  const carreteraId = parseInt(id, 10); // Convertir el id a número si es necesario

  const containerStyle = {
    width: "100%",
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

  useEffect(() => {
    const fetchCarretera = async () => {
      try {
        const response = await getCarreteraById(carreteraId);
        setCarreteraData({
          nombre: response.nombre,
          estado: response.estado,
          trazado: response.trazado.coordinates,
        });
        setSelectedPoints(
          response.trazado.coordinates.map((coord) => ({
            lat: coord[1],
            lng: coord[0],
          }))
        );
      } catch (error) {
        console.error("Error al cargar los datos de la carretera:", error);
      }
    };

    fetchCarretera();
  }, [carreteraId]);

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

  const handleUpdateCarretera = async (e) => {
    e.preventDefault();

    const coordinates = selectedPoints.map((point) => [point.lng, point.lat]);

    const updatedCarretera = {
      ...carreteraData,
      trazado: {
        type: "LineString",
        coordinates: coordinates,
      },
    };

    try {
      await updateCarretera(carreteraId, updatedCarretera);
      alert("Carretera actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la carretera:", error);
      alert("Error al actualizar la carretera");
    }
  };

  return (
    <div>
        <br />
        <br />
        <br />
      <h3>Editar Carretera</h3>
      <div className="map-container mb-3">
        <LoadScript googleMapsApiKey="AIzaSyDfXsLA8P35Cjp5rZdkBIYeK-bP74GF4Gw">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedPoints[0] || defaultCenter}
            zoom={6}
            onClick={handleMapClick}
          >
            {selectedPoints.length > 0 && (
              <Polyline
                path={selectedPoints}
                options={{
                  strokeColor: "#0000FF",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <Form onSubmit={handleUpdateCarretera}>
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
            <option value="Cerrada">Cerrada</option>
            <option value="En Construcción">En Construcción</option>
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
          Actualizar Carretera
        </Button>
      </Form>
    </div>
  );
};

export default EditarCarretera;
