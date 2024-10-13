import "../../styles/Prueba.css"

export const CardTest = ({
  selectTest,
  markTest,
  isSelected = false,
  cancel,
  id,
  name,
  state,
  description,
  acceptance,
  startDate,
  endDate,
  project,
  user
}) => {
  const sDate = new Date(startDate).toISOString().split('T')[0];
  const eDate = new Date(endDate).toISOString().split('T')[0]; 

  return(
    <div 
      class="test-card"
      onClick={() => { 
        selectTest(id)
      }}
    > 
      <label>📁 {project.name}</label><br />
      <label>📓 {name}</label><br />
      <span>👱 {user?.email}</span>
      {isSelected &&
        <>
          <p>
            <span>Descripción</span><br />
            {description}
          </p>
          
          <p>
            <span>Aceptación</span><br />
            {acceptance}
          </p>          
        </>
      }
      <div class="date-range">
        📅
        <small>{sDate} al {eDate}</small>
      </div>
      
      {isSelected &&
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "8px" }}>
          {state == "EXECUTED" ?
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "8px",
                background: "#24AB24",
                color: "#fff"
              }}
            >✔ Ejecutada</span>            
          :
            <button
              onClick={()=> markTest(id, 'EXECUTED')}
            >Ejecutar prueba</button>            
          }
          <button onClick={() => cancel()}>Regresar</button>
        </div>
      }
    </div>    
  )
}