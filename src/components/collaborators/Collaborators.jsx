import { useEffect, useState } from "react"
import { get } from "../scripts/api";

import Sidebar from "../dashboard/Sidebar"
import Table from "./Table"

export const Collaborators = () => {
  const [users, setUsers] = useState([])

  const list = () => {
    get('/auth').then((res)=>{
      console.log("res users list... ", res)
      setUsers(res)
    })
  }

  useEffect(()=>{
    list()
  }, [])

  return(
    <Sidebar>
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>        
        <h3>Colaboradores</h3>          
        <Table data={users} list={list} />
      </div>
    </Sidebar>    
  )
}