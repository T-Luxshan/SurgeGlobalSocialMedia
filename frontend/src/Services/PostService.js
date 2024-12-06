import axiosAuthInstance from "./AuthService";

const BASE_URL_USER = `http://localhost:8080/api/v1/posts`;

export const createPost = (photo, caption) => {
    return axiosAuthInstance.post(`${BASE_URL_USER}`, {
        photo, caption, 
    });
};

export const getAllPosts = () => {
   return axiosAuthInstance.get(`${BASE_URL_USER}`);
};

export const likePost = (id) => {
    return axiosAuthInstance.post(`${BASE_URL_USER}/${id}/like`)
}

export const disLikePost = (id) => {
    return axiosAuthInstance.post(`${BASE_URL_USER}/${id}/unlike`)
}
    
