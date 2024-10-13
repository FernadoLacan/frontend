import "../../styles/Prueba.css"

export const Prueba = ({
  deleteTest,
  selectTest,
  isSelected = false,
  cancel,

  id,
  name,
  description,
  acceptance,
  startDate,
  endDate,
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
          <button 
            style={{ background: "red", color: "#fff" }}
            onClick={()=> deleteTest(id)}
          >Eliminar la prueba</button>
          <button onClick={() => cancel()}>Cancelar</button>
        </div>
      }
    </div>    
  )
}