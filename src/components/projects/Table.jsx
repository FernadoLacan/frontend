import React from 'react';
import { Link } from 'react-router-dom';
import { remove } from '../scripts/api';
import { formatDate } from '../scripts/util';

const Table = ({ data, list }) => {
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

  const deleteData = async (id) => {
    const res = await remove(`/projects/${id}`)
    if(res){
      console.log("res ... ", res)
      list();
    }
  }

  console.log("Datita, datita ... ", data)
  return (
    <table style={tableStyle}>
      <thead>
        <tr>                             
          <th style={thStyle}>Nombre</th>
          <th style={thStyle}>Cliente</th>
          <th style={thStyle}>Fecha de inicio</th>
          <th style={thStyle}>Fecha de fin</th>
          <th style={thStyle}>
            <Link className='create' to={`/projects/new`}>Crear Proyecto +</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
            <td style={tdStyle}>{item.name}</td>
            <td style={tdStyle}>{item.clientName}</td>
            <td style={tdStyle}>{formatDate(item.startDate)}</td>
            <td style={tdStyle}>{formatDate(item.endDate)}</td>
            <td style={tdStyle}>
              <Link to={`/admin-project/${item.id}`}>Administrar</Link>
              <Link to={`/projects/${item.id}`} style={{...buttonStyle, marginLeft: '10px'}}>Editar</Link>
              <button 
                style={{ ...buttonStyle, background: '#dc3545', marginLeft: '10px' }}
                onClick={async () => {
                  await deleteData(item.id);
                }}
              >Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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