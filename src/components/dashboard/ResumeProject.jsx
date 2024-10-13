import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../../styles/resume-project.css"

export const ResumeProject = ({project}) => {
  const [totalTests, setTotalTests] = useState(0);
  const [totalExecutedTests, setTotalExecutedTests] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalFixedIssues, setTotalFixedIssues] = useState(0);


  useEffect(()=>{    
    const executedTests = project.tests.filter(t => t.state == "EXECUTED").length;

    let issues = 0;
    let fixedIssues = 0;
    project.tests.forEach(test => {
      test.issues.forEach(issue => {   
             
        if(issue.state == "FINISHED"){
          fixedIssues = fixedIssues + 1;
        }

        issues = issues + 1;        
      })      
    })

    setTotalTests(project.tests.length);
    setTotalExecutedTests(executedTests);
    setTotalIssues(issues);
    setTotalFixedIssues(fixedIssues);
  }, [])

  console.log("total issues ::: ", totalIssues)
  return(
    <div className="resume-project">
      <div>
        <h3>{project.name}</h3>
        <small>{project.clientName}</small>
      </div>
      <div>
        <div className="progress-detail">
          <small>Pruebas {totalExecutedTests}/{totalTests}</small>
          <progress value={totalExecutedTests} max={totalTests} className="test-progress"></progress>
        </div>

        <div className="progress-detail">
          <small>Errores {totalFixedIssues}/{totalIssues}</small>
          <progress value={totalFixedIssues} max={totalIssues} className="issue-progress"></progress>
        </div>
        <div className="actions">
          <Link to={`/admin-project/${project.id}`} >Administrar</Link>
        </div>
      </div>
    </div>
  )
}