const baseUrl = "http://localhost:3000/api"

export const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; SameSite=Strict`;
}

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/; secure; SameSite=Strict`;
}

// Método para realizar una solicitud GET
export const get = async (endpoint) => {
  try {
    const token = getCookie('authToken');
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado más adelante
  }
}

// Método para realizar una solicitud POST
export const post = async (endpoint, data) => {
  try {
    const token = getCookie('authToken');
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
}

// Método para realizar una solicitud PUT
export const put = async (endpoint, data) => {
  try {
    const token = getCookie('authToken');
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
}

// Método para realizar una solicitud DELETE
export const remove = async (endpoint) => {
  const token = getCookie('authToken');
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {        
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
}
