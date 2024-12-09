import  { useState } from "react";
const ReportIncident = () => {
  const [incidentDetails, setIncidentDetails] = useState("");
  const [incidentImage, setIncidentImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ incidentDetails, incidentImage });
    // Lógica para enviar el incidente al backend
  };

  return (
    <div className="report-incident-container">
      <h1>Reportar Incidente</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Detalle del Incidente</label>
          <textarea
            className="form-control"
            rows="4"
            value={incidentDetails}
            onChange={(e) => setIncidentDetails(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subir Foto</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setIncidentImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default ReportIncident;
