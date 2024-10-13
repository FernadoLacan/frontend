import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import { useEffect, useState } from "react";
import { get, post, put } from "../scripts/api";

export const ProjectDetail = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(()=>{
    if(id !== "new"){
      get(`/projects/${id}`).then((res)=>{        
        setName(res.name);
        setClientName(res.clientName);
        //setStartDate(res.startDate)
        setStartDate(new Date(res.startDate).toISOString().split('T')[0])
        setEndDate(new Date(res.endDate).toISOString().split('T')[0])
      })
    }
  }, [])

  const createData = async () => {
    const data = {
      name,
      clientName,
      startDate,
      endDate
    };

    const res = await post("/projects", data);
    if(res){
      console.log("res... ", res);
      navigation('/projects')
    }
  };

  const updateData = async () => {
    const data = {      
      name,
      clientName,      
      startDate,
      endDate
    };

    const res = await put(`/projects/${id}`, data);
    if(res){
      navigation('/projects')
    }
  };

  return (
    <Sidebar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Link 
            style={{textDecoration: "none", color: "#000"}}
            to="/projects"
          >← Regresar</Link>
          <h2>{id == "new" ? "Crear" : "Actualizar"} Proyecto</h2>
          <span style={{ visibility: 'hidden' }}>Hola</span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (id == "new") {
              await createData();
            }else{
              await updateData();
            }
          }}
        >
          <label>Nombre</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Nombre del cliente</label>
          <input
            name="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <label>Fecha de inicio</label>
          <input
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}          
          />
          <label>Fecha de finalización</label>
          <input
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}          
          />                    
          <button type="submit">{id == "new" ? "Crear" : "Actualizar"}</button>
        </form>
      </div>
    </Sidebar>
  );
};
