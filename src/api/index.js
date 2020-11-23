import axios from 'axios';


export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log("productId: id", id)
    console.log("productId:", data)
    return data;
  } catch (error) {
    throw error;
  }
}
