import { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar"
import { useParams, Link } from "react-router-dom";
import { TestForm } from "./TestForm";
import { get, post, put, remove } from "../scripts/api";
import { Prueba } from "./Prueba";
import { IssueForm } from "./IssueForm";
import useConfirmModal from "../../hooks/useConfirmModal";

export const AdminProject = () => {  
  const { id } = useParams();
  const { showModal, Modal } = useConfirmModal();
  const [showTestForm, setShowTestForm] = useState(false)
  const [showTestList, setShowTestList] = useState(true);
  const [project, setProject] = useState(null)
  const [test, setTest] = useState(null)
  const [issue, setIssue] = useState(null)
  
  const hiddeTestForm = () => {
    setShowTestForm(false);
    setShowTestList(true);
  }

  const getProjectDetail = () => {    
    get(`/projects/${id}`).then((res)=>{         
      setProject(res)
    })
  }

  useEffect(()=> {
    getProjectDetail();  
  }, [])

  const createTest = (data) => {
    const formData = {
      id,
      ...data      
    }

    post(`/tests`, formData).then((res)=>{
      getProjectDetail();
      hiddeTestForm();
    })    
  }

  const selectTest = (testId) => {
    const selTest = project.tests.find(t => t.id == testId)
    console.log("new sel test ::: ", selTest)
    if(selTest){
      setTest({...selTest})
      setShowTestList(false);
    }
  }

  const cancelTest = () => {
    setTest(null);
    setShowTestList(true);
  }

  const createIssue = (formData) => {
    post(`/issues`, formData).then((res)=>{
      if(test){
        const currentIssues = test.issues
        currentIssues.push(res)

        setTest({ ...test, issues: [...currentIssues]})
      }
    })  
  }

  const updateIssue = (formData) => {
    put(`/issues/${issue.id}`, formData).then((res)=>{
      if(test){
        const currentIssues = test.issues.filter(i => i.id !== issue.id)
        currentIssues.push(res)

        setTest({ ...test, issues: [...currentIssues]})
      }
    })  
  }

  const cancelUpdate = () => {
    setIssue(null);
  }

    
  const deleteIssue = (issueId) => {
    showModal(
      '¿Estás seguro(a) de que desea eliminar el error?',
      () => {
        remove(`/issues/${issueId}`).then((res)=>{
          if(test){
            const currentIssues = test.issues.filter(i => i.id !== res.id)    
            setTest({ ...test, issues: [...currentIssues]})
          }
          alert("El error se ha eliminado correctamente.")
        })
      }
    );
  };

  const deleteTest = (testId) => {
    showModal(
      '¿Estás seguro(a) que desea elminar la prueba?',
      () => {
        remove(`/tests/${testId}`).then((res)=>{          
          const currentTests =  project.tests.filter(t => t.id !== res.id)
          setProject({
            ...project,
            tests: [...currentTests]
          })
          
          alert("La prueba se ha eliminado correctamente.");
          cancelTest();
        })
      }
    );    
  }
  

  return(
    <Sidebar>
      <div style={{ display: "flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
          <Link 
              style={{textDecoration: "none", color: "#000"}}
              to="/projects"
          >← Regresar</Link>   
          {project &&
            <h3 style={{ textDecoration: "underline" }}>Administrar proyecto {project.name}</h3>
          }  
          <div>
            <button onClick={()=> {
              setShowTestForm(true)
              setShowTestList(false)
              setTest(null)
            }}>Agregar Prueba +</button>  
          </div>
        </div>
        {showTestForm && 
          <TestForm projectId={id} cancel={hiddeTestForm} createTest={createTest} />
        }
        {showTestList &&
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "flex-start", width: "100%" }}
          >
            {project?.tests.map(test => (
              <Prueba key={test.id} {...test} selectTest={selectTest} />
            ))}
          </div>          
        }
        {test &&
          <div style={{ display: "flex", gap: "18px", width: "100%", justifyContent: "space-around", alignItems: "flex-start" }}>
            <Prueba
              deleteTest={deleteTest}
              isSelected
              {...test}
              cancel={cancelTest}
            />

            <div
              style={{ display: "flex", gap: "8px", justifyContent: "flex-start", flexWrap: "wrap", width: 300 }}
            >
              <h3>Errores encontrados en la prueba</h3>
              {test.issues.map(issue => (
                <small
                  style={{ display: 'flex', justifyContent: "flex-start", gap: "4px", background: "#C5ABF5", width: "max-content", padding: 4, borderRadius: 8, cursor: 'pointer', alignItems: "center" }}
                >
                  <span>
                    {issue.state == "PENDING" && "⏲"}
                    {issue.state == "REVIEWING" && "⌨"}
                    {issue.state == "FINISHED" && "✔"}
                  </span>
                  <span>
                  {issue.name} 
                  </span>                  
                  <span
                    title="Editar"
                    style={{                      
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 20,
                      borderRadius: 12,
                      background: "#fff"
                    }}
                    onClick={() => setIssue(issue)}
                  >
                   👁
                  </span>                  
                  <span
                    title="eliminar"
                    style={{                      
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 20,
                      borderRadius: 12,
                      background: "#fff"
                    }}
                    onClick={()=> {
                      deleteIssue(issue.id)                      
                    }}
                  >⨉</span>
                </small>
              ))}
            </div>
            
            <div>
              <IssueForm
                createIssue={createIssue}         
                updateIssue={updateIssue}
                cancelUpdate={cancelUpdate}
                issue={issue}
                key={issue?.id}
                testId={test.id}                
              />
            </div>            
            <Modal />
          </div>
        }
      </div>      
    </Sidebar>
    
  )
}