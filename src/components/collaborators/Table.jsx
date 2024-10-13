import React from 'react';
import { Link } from 'react-router-dom';
import { remove } from '../scripts/api';
import useConfirmModal from '../../hooks/useConfirmModal';

const Table = ({ data, list }) => {
  const { showModal, Modal } = useConfirmModal();

  const tableStyle = {    
    borderCollapse: 'collapse',
    marginTop: '20px',
    margin: '0 auto'
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    color: '#333',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    color: '#555',
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  const deleteUser = async (id) => {
    showModal(
      '¿Estás seguro de que quieres eliminar este elemento?',
      () => {
        remove(`/auth/${id}`).then((res)=>{
          if(res){
            console.log("res ... ", res)
            list();
          }
          alert("Usuario eliminado correctamente")
        })        
      }
    );
  }

  const ROLES = {
    ADMIN: "Administrador",
    DEVELOPER: "Desarrollador"
  }
  
  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr>                   
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Apellido</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>
              <Link className='create' to={`/collaborators/new`}>Crear Usuario +</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
              <td style={tdStyle}>{item.email}</td>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.lastname}</td>
              <td style={tdStyle}>{ROLES[item.role]}</td>
              <td style={tdStyle}>
                <Link to={`/collaborators/${item.id}`} style={buttonStyle}>Editar</Link>
                <button 
                  style={{ ...buttonStyle, background: '#dc3545', marginLeft: '10px' }}
                  onClick={async () => {
                    await deleteUser(item.id);
                  }}
                >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal />
    </>
  );
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default Table;