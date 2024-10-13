import Sidebar from "../developer/Sidebar"
import { useEffect, useState } from "react"
import { get, put } from "../scripts/api"
import '../../styles/issues.css'

export const Issues = () => {
  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [showIssueList, setShowIssueList] = useState(true)
  const [developer, setDeveloper] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [grupedData, setGrupedData] = useState(null)

  const groupedByTestId = (data) => {
    const newData = data.reduce((acc, item) => {
      const testId = item.test.name;
      if (!acc[testId]) {
        acc[testId] = [];
      }
      acc[testId].push(item);
      return acc;
    }, {});

    setGrupedData(newData);    
  }

  const getIssues = () => {
    get('/issues/get-developer-issues').then((res)=>{
      setIssues(res)
      groupedByTestId(res);
      setDeveloper(res[0].user)
    })
  }

  useEffect(()=>{
    getIssues()
  }, [])

  const selectIssue = (issueId) => {
    const selIssue = issues.find(i => i.id == issueId)
    setSelectedIssue(selIssue)
    setSidebarOpen(true)
  }

  const markIssue = (issueId, state) => {    
    put(`/issues/mark-issue/${issueId}`, { state: state }).then((res)=>{
      console.log("mark issue res ::: ", res)
      setSelectedIssue({
        ...selectedIssue,
        state: res.state
      })

      getIssues();
    })    
  }

  return(
    <Sidebar>
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
        <h3>Errores asignados</h3>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px", justifyContent: "flex-start", width: "100%" }}>
          {grupedData &&
          <>
            {Object.entries(grupedData).map(([key, value]) => (          
              <div 
                key={key}
                style={{ 
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  border: "solid 2px #000",
                  borderRadius: "8px"
                }}
              >
                <span
                  style={{                    
                    fontWeight: 700
                  }}
                >
                  Prueba:&nbsp;
                  <span
                    style={{
                      color: "#68947A",
                      textDecoration: "underline"
                    }}
                  >{key}</span></span>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  {value.map(issue => (
                    <li
                      onClick={()=> selectIssue(issue.id)}
                      style={{
                        listStyle: "none",
                        padding: "8px",
                        borderRadius: "4px",
                        background: "#F1F9FE"
                      }}
                    >
                      {issue.state == "PENDING" && "⏲"}
                      {issue.state == "REVIEWING" && "⌨"}
                      {issue.state == "FINISHED" && "✔"}
                      &nbsp;
                      {issue.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
          }
        </div>
      </div>
      <div className={`right-sidebar ${sidebarOpen ? 'right-sidebar-open' : '' }`}        
      >
        <div className="header">
          <span 
            className="times-button"
            onClick={()=> setSidebarOpen(false)}
          >⨉</span>          
        </div>     

        {selectedIssue &&
            <div className="issue" style={{ background: "#fff", height: "100%" }}>
              <label>🤖 Proyecto: {}</label>
              <label>🧪 Prueba: {selectedIssue.test.name}</label>
              <label>🕷 Problema: {selectedIssue.name}</label>
              {selectedIssue.description &&
                <>
                  <label>Descripción:</label>
                  <p>{selectedIssue.description}</p>
                </>
              }
              
              {selectedIssue.state == "PENDING" &&
              <>
                <span className="state-pending">Pendiente</span>
                <button
                  className="start-working"
                  onClick={()=> markIssue(selectedIssue.id, "REVIEWING")}
                >
                  Comenzar a trabajar
                </button>
              </>
              }
              {selectedIssue.state == "REVIEWING" &&
                <>
                  <span className="state-working">⌨ Trabajando</span>
                  <button 
                    className="fixed-issue"
                    onClick={()=> markIssue(selectedIssue.id, "FINISHED")}
                  >
                    Marcar como solucionado
                  </button>                
                </>
              }
              {selectedIssue.state == "FINISHED" &&
                <span className="state-finished">✔ Corregido</span>
              }              
            </div>
        }   
      </div>
    </Sidebar>
  )
}