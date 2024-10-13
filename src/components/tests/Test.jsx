import Sidebar from "../developer/Sidebar"
import { useEffect, useState } from "react"
import { get, post, put } from "../scripts/api"
import { CardTest } from "./CardTest"
import { IssueForm } from "./IssueForm"

export const Test = () => {
  const [tests, setTests] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [showTestList, setShowTestList] = useState(true)
  const [developer, setDeveloper] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

  const getTests = () => {
    get('/tests/get-developer-tests').then((res)=>{
      console.log("test test res ::: ", res)
      setTests(res)
      setDeveloper(res[0].user)
    })
  }

  useEffect(()=>{
    getTests()
  }, [])

  const selectTest = (testId) => {
    const selTest = tests.find(t => t.id == testId)        
    if(selTest){
      setSelectedTest(selTest)
      setShowTestList(false);
    }
  }

  const cancelTest = () => {
    setSelectedTest(null);
    setShowTestList(true);
  }

  const createIssue = (formData) => {
    post(`/issues`, formData).then((res)=>{
      setShowMessage(true);
    })  
  }

  const markTest = (testId, state) => {    
    put(`/tests/mark-test/${testId}`, { state: state }).then((res)=>{      
      setSelectedTest({
        ...selectedTest,
        state: res.state
      })
    })    
  }

  return(
    <Sidebar>      
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
        <h3>Pruebas asignadas</h3>
        
          <table className="resume-table">
            <tbody>
              <tr>
                <td>Pruebas asginadas</td>
                <td className="total">{tests.length}</td>
                <td>Pruebas ejecutadas</td>
                <td className="total">{tests.filter(t => t.state == "EXECUTED").length}</td>
              </tr>              
            </tbody>
          </table>        
        {showTestList &&
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", width: "100%" }}>
            {tests?.map(test => (        
              <CardTest
                key={test.id}
                {...test}
                selectTest={selectTest}
              />
            ))}      
          </div>
        }
        
        {selectedTest &&
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", width: "100%" }}>
            {showMessage &&
            <div
              style={{
                background: "yellow",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "#ACE195"
              }}
            >
              Se registró el error para la prueba, puede verlo en el menú de errores.
              <span
                style={{ marginLeft: "4px", fontSize: "21px", cursor: "pointer" }}
                onClick={()=> setShowMessage(false)}
              >⨉</span>
            </div>
            }
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "16px", alignItems: "flex-start", width: "100%" }}>
              <CardTest 
                isSelected={true}
                cancel={cancelTest}
                markTest={markTest}
                {...selectedTest}                
              />
              {selectedTest.state == 'EXECUTED' ?
                <IssueForm createIssue={createIssue} testId={selectedTest.id} developerId={developer.id} />
              : 
                <div
                  style={{
                    background: "yellow",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "#95D3E1"
                  }}
                >
                  Para registrar errores debe ejecutar la prueba.                  
                </div>              
              }
            </div>
          </div>
        }        
      </div>
    </Sidebar>
  )
}