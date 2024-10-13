import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/sidebar.css';
import { getCookie, deleteCookie } from '../scripts/api';

const Sidebar = ({children}) => {
  const navigate = useNavigate();

  //Verifica que el usuario tenga una sesión activa
  useEffect(()=>{
    if(!getCookie("authToken"))
      navigate("/login")
  }, []);

  return (
    <div className='sidebar-wrapper'>
      <div className='sidebar-style'>
        <h2 style={{ margin: '0 0 20px' }}>Menu</h2>
        <Link to="/tests" className="sidebar-link-style">
          Pruebas
        </Link>
        <Link to="/issues" className="sidebar-link-style">
          Errores
        </Link>        
        <a           
          className='sidebar-link-style'
          onClick={()=>{
            deleteCookie("authToken");
            navigate("/login");
          }}
        >
          Salir
        </a>
      </div>
      <div style={{ width: "200px" }}></div>
      <div className='sidebar-content'>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;