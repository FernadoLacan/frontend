import { useState } from "react";
import { post, setCookie } from "../scripts/api";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return(
    <section>
      <h3>Login</h3>

      <form onSubmit={async (event)=> {

        event.preventDefault();
        const data = { email, password };
        const res = await post('/auth/login', data);   
        console.log("login res ... ::: ", res)     
        if(res?.token){
          setCookie("authToken", res.token)
          if(res.role == "ADMIN"){
            navigate("/dashboard")
          }else if(res.role == "DEVELOPER"){
            navigate("/developer")
          }
        }
      }}>
        <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        <input type="password" name ="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        <button type="submit">Aceptar</button>
      </form>
    </section>
  )
}

export default Login