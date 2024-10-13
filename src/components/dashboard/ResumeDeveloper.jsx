import "../../styles/resume-developer.css"
import { groupByProject } from "../scripts/util"

export const ResumeDeveloper = ({developer}) => {
  
  const grouped = groupByProject(developer.issues)
  console.log("GROUPED ::: ", grouped)
  return(
    <div className="resume-developer">      
      <label>{developer.email}</label>
      <small>[{developer.name} {developer.lastname}]</small>

      <div>
          {Object.entries(grouped).map(([key, value]) => (
            <><span>{key}</span><span>{value.length}</span></>
          ))}
        </div>
      <div className="resume-table-container">
        <table className="developer-table shadow-test">
          <thead>
            <tr>
              <th rowSpan={2}>Pruebas <span>{developer.tests.length}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pendientes</td>          
              <td className="total">{developer.tests.filter(t => t.state == "PENDING").length}</td>
            </tr>
            <tr>
              <td>Ejecutadas</td>
              <td className="total">{developer.tests.filter(t => t.state == "EXECUTED").length}</td>
            </tr>
          </tbody>
        </table>

        <table className="developer-table shadow-issue">
          <thead>
            <tr>
              <th rowSpan={2}>Errores <span>{developer.issues.filter(i => i.test.active == true).length}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pendientes</td>          
              <td className="total">{developer.issues.filter(t => t.state == "PENDING").length}</td>
            </tr>
            <tr>
              <td>En progreso</td>
              <td className="total">{developer.issues.filter(t => t.state == "REVIEWING").length}</td>
            </tr>
            <tr>
              <td>Corregidos</td>
              <td className="total">{developer.issues.filter(t => t.state == "FINISHED").length}</td>
            </tr>          
          </tbody>
        </table>
      </div>
    </div>
  )
}