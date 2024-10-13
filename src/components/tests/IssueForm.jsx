import { useState, useEffect } from "react";
import { get } from "../scripts/api";

export const IssueForm = ({
  testId,
  developerId,
  createIssue
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")  
  const [developer, setDeveloper] = useState('');
  const [developers, setDevelopers] = useState([])
  
  useEffect(()=>{
    get('/auth/developers').then((res)=>{
      setDevelopers(res);
      setDeveloper(developerId)
    })
  }, [])

  return(
    <div
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h3 style={{ marginTop: 0 }}>Registro de errores</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createIssue({
            testId,
            name,
            description,
            userId: developer
          })

          setName("")
          setDescription("")
          setDeveloper("")
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
        <select required onChange={(e) => setDeveloper(e.target.value)} disabled>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>{developer.email}</option>
          ))}
        </select>
        <button type="submit">Registrar Error</button>
      </form>
    </div>
  )
}