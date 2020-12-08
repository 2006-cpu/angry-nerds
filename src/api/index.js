import axios from 'axios';


export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get('/api/users');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductByCategory(category) {
  try {
    const { data } = await axios.get(`/api/products/${category}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCart() {
  try {
    const { data } = await axios.get('/api/orders/cart');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get('/api/orders');
    return data;
  } catch (error) {
    throw error;
  }
}

export const callApi = async ({method, body, url, token}) => {
  try {
      const options = {
          method: method || 'GET',
          data: body,
          url: `${url}`
      }
      /* if we have a token, pass another property to the options object */
      if(token) {
          options.headers = {
              'Authorization': `Bearer ${token}`
          }
      }
      const {data} = await axios(options)
      return data;
  } catch(error) {
      console.error(error)
  }
}
