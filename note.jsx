import { useParams } from "react-router-dom"
import Sidebar from "../dashboard/Sidebar";
import { useEffect, useState } from "react";
import { get } from "../scripts/api";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(()=>{
    get('/auth/developers').then((res)=>{
      setDevelopers(res)
    })
  }, [])

  return(
    <Sidebar>
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
        <h2>Yo soy el detalle</h2>
        <form>
          <label>Nombre</label>
          <input name="name" type="text" required/>
          <label>Fecha de inicio</label>
          <input name="startDate" type="date" value={startDate} required/>
          <label>Fecha de finalización</label>
          <input name="endDate" type="date" value={endDate} required/>
          <label>Encargado</label>
          <select required>
            {developers.map(developer => (
              <option key={developer.id} value={developer.id}>{developer.email}</option>
            ))}
          </select>
          <button type="submit">{id == "new" ? "Crear" : "Actualizar"}</button>

        </form>
      </div>
    </Sidebar>
  )
}