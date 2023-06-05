import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://63ebe5f3be929df00ca4038a.mockapi.io/users',
});

export const getAllUsers = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const updateUserFollowers = async (id, data) => {
  try {
    const { data: result } = await instance.put(`/${id}`, data);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
