import { useState, useEffect } from "react";
import { get } from "../scripts/api";

export const IssueForm = ({
  issue=null,
  testId,
  createIssue,
  updateIssue,
  cancelUpdate
}) => {  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")  
  const [developer, setDeveloper] = useState("");
  const [developers, setDevelopers] = useState([])

  useEffect(()=>{
    get('/auth/developers').then((res)=>{
      setDevelopers(res);
      if(!issue){
        setDeveloper(res[0].id)
      }
    })
  }, [])

  useEffect(()=>{
    if(issue){
      setName(issue.name);
      setDescription(issue.description);
      setDeveloper(issue.user.id);      
    }
  }, [issue])

  const clearFields = () => {
    setName("")
    setDescription("")
    setDeveloper("")
  }

  return(
    <div
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h3>Registro de errores</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if(issue){
            updateIssue({
              name,
              description,
              userId: developer
            })
            cancelUpdate();          
          }else{
            createIssue({
              testId,
              name,
              description,
              userId: developer
            })
          }

          clearFields();
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
        <label>Descripción</label>
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Encargado</label>
        <select 
          required 
          onChange={(e) => setDeveloper(e.target.value)}
          value={developer}
        >
          {developers.map(developer => (
            <option 
              key={developer.id} 
              value={developer.id}              
            >{developer.email}</option>
          ))}
        </select>
        {issue ?
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button 
              style={{ background: "green" }}
              type="submit"
            >Actualizar Error</button>
            <button
              type="button"
              onClick={() => {
                cancelUpdate();
                clearFields();
              }}
            >Cancelar</button>
          </div>
        :          
          <button type="submit">Registrar Error</button>                    
        }        
      </form>
    </div>
  )
}