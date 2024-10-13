import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import { useEffect, useState } from "react";
import { get, post, put } from "../scripts/api";

export const CollaboratorDetail = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(()=>{
    if(id !== "new"){
      get(`/auth/${id}`).then((res)=>{
        console.log("res .::. ", res)
        setName(res.name);
        setLastname(res.lastname);
        setEmail(res.email)
        setRole(res.role)
      })
    }
  }, [])

  const createUser = async () => {
    const data = {
      name,
      lastname,
      password,
      role,
      email,
    };

    const res = await post("/auth/register", data);
    if(res){
      console.log("res... ", res);
      navigation('/collaborators')
    }
  };

  const updateUser = async () => {
    const data = {      
      name,
      lastname,      
      role,
      email,
    };

    const res = await put(`/auth/${id}`, data);
    if(res){
      navigation('/collaborators')
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
            to="/collaborators"
          >← Regresar</Link>
          <h2>{id == "new" ? "Crear" : "Actualizar"} colaborador</h2>
          <span style={{ visibility: 'hidden' }}>Hola</span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (id == "new") {
              await createUser();
            }else{
              await updateUser();
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
          <label>Apellido</label>
          <input
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Rol</label>
          <select
            required
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="" disabled>
              Elija un rol
            </option>
            <option value="ADMIN">Administrador</option>
            <option value="DEVELOPER">Desarrollador</option>
          </select>
          <label>Correo</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {id == "new" &&
            <>
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          }
          <button type="submit">{id == "new" ? "Crear" : "Actualizar"}</button>
        </form>
      </div>
    </Sidebar>
  );
};
