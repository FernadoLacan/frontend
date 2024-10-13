import { useState, useEffect } from "react"
import { get } from "../scripts/api";

export const TestForm = ({ projectId, createTest, cancel }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [acceptance, setAcceptance] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [developer, setDeveloper] = useState('');
  const [developers, setDevelopers] = useState([])

  useEffect(()=>{
    get('/auth/developers').then((res)=>{
      setDevelopers(res);
      setDeveloper(res[0].id)
    })
  }, [])

  return(
    <>
      <h3>Crear Prueba</h3>
      <form
        style={{ maxWidth: "600px" }}
        onSubmit={(e) => {
          e.preventDefault();
          createTest({
            projectId: projectId,
            name,
            userId: developer,
            description,
            acceptance,
            startDate,
            endDate
          })
        }}
      >
        <label>Nombre de la prueba</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <label>Descripción</label>
            <textarea
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column"}}>
            <label>Aceptación</label>
            <textarea
              name="acceptance"
              type="text"
              value={acceptance}
              onChange={(e) => setAcceptance(e.target.value)}
              required
            />
          </div>
        </div>
        <label>Encargado</label>
        <select required onChange={(e) => setDeveloper(e.target.value)}>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>{developer.email}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "8px"}}>
            <div style={{ display: "flex", flexDirection: "column"}}>
              <label>Fecha de inicio</label>
              <input
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}          
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column"}}>
              <label>Fecha de finalización</label>
              <input
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}          
              />
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <button type="button"
            onClick={()=> cancel()}
          >Cancelar</button>
          <button type="submit">Crear Prueba</button>
        </div>
      </form>
    </>
  )
}