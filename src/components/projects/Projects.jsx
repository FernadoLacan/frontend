import { useEffect, useState } from "react"
import { get } from "../scripts/api";

import Sidebar from "../dashboard/Sidebar"
import Table from "./Table"

export const Projects = () => {
  const [projects, setProjects] = useState([])

  const list = () => {
    get('/projects').then((res)=>{
      console.log("res projects list... ", res)
      setProjects(res)
    })
  }

  useEffect(()=>{
    list()
  }, [])

  return(
    <Sidebar>
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>        
        <h3>Proyectos</h3>          
        <Table data={projects} list={list} />
      </div>
    </Sidebar>    
  )
}