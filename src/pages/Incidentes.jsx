import { useState, useEffect } from "react";
import axios from "axios";

const IncidentPhotos = ({ incidenteId }) => {
    const [fotos, setFotos] = useState([]); // Lista de fotos
    const [archivo, setArchivo] = useState(null); // Archivo seleccionado

    useEffect(() => {
        // Cargar fotos al montar el componente
        const fetchFotos = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/incidentes/${incidenteId}/fotos`);
                setFotos(response.data.data); // Actualizar estado con fotos
            } catch (error) {
                console.error("Error al cargar fotos:", error);
            }
        };
        fetchFotos();
    }, [incidenteId]);

    const handleUpload = async () => {
        if (!archivo) {
            alert("Seleccione una foto.");
            return;
        }

        const formData = new FormData();
        formData.append("foto", archivo);

        try {
            await axios.post(`http://localhost:3000/api/incidentes/${incidenteId}/fotos`, formData);
            const response = await axios.get(`http://localhost:3000/api/incidentes/${incidenteId}/fotos`);
            setFotos(response.data.data); // Recargar fotos
        } catch (error) {
            console.error("Error al subir foto:", error);
            alert("Error al subir la foto.");
        }
    };

    const handleDelete = async (fotoId) => {
        try {
            await axios.delete(`http://localhost:3000/api/incidentes/${incidenteId}/fotos/${fotoId}`);
            const response = await axios.get(`http://localhost:3000/api/incidentes/${incidenteId}/fotos`);
            setFotos(response.data.data); // Recargar fotos
        } catch (error) {
            console.error("Error al eliminar foto:", error);
            alert("Error al eliminar la foto.");
        }
    };

    return (
        <div>
          <br />
          <br />
          <br />
            <h3>Fotos del Incidente</h3>
            <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
            <button onClick={handleUpload}>Subir Foto</button>
            <ul>
                {fotos.map((foto) => (
                    <li key={foto.id}>
                        <img
                            src={`http://localhost:3000/uploads/${foto.rutaArchivo}`}
                            alt={foto.nombreArchivo}
                            width="100"
                        />
                        <button onClick={() => handleDelete(foto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncidentPhotos;
