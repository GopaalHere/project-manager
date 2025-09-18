import axios from 'axios';

const API = axios.create({baseURL:import.meta.env.VITE_API_BASE_URL, withCredentials:true})

const authAPI = axios.create({baseURL:import.meta.env.VITE_AUTH_API, withCredentials:true})

export const fetchProjects = async()=>{
    const res = await API.get('/get-projects');
    return res.data;
}

export const addNewProject = async(projectData)=>{
    const res = await API.post('/add-project',projectData);
    return res.data;
}

export const deleteOneProject = async(id)=>{
     const res = await API.delete(`/delete/${id}`);
     return res.data;
}

export const getOneProject = async(id)=>{
    const res = await API.get(id);
    return res.data;
}

export const updateProject = async(id, updateData)=>{
    const res = await API.put(`/update/${id}`, updateData)
    return res.data;
}


export const signUp = async(userData)=>{
    const res = await authAPI.post('/signup',userData)
    return res.data;
}
export const login = async(userData)=>{
    const res = await authAPI.post('/login',userData)
    return res.data;
}

export const logout = async()=>{
    const res = await authAPI.post('/logout');
    return res.data;
}

export const getCurrentUser = async () => {
  const res = await authAPI.get("/me");
  return res.data;
};