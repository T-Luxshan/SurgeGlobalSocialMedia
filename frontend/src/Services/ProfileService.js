import axiosAuthInstance from "./AuthService";

const BASE_URL_PROFILE = `http://localhost:8080/api/v1/profile`;


export const addProfilePhoto = (profileUri) => {
    axiosAuthInstance.post(`${BASE_URL_PROFILE}`, {
        profileUri 
    });
};

export const updatePhoto = (profileUri) => {
    axiosAuthInstance.put(`${BASE_URL_PROFILE}`, {
        profileUri 
    });
};

export const deletePhoto = () => {
    axiosAuthInstance.delete(`${BASE_URL_PROFILE}`);
};


export const getPhoto = () => {
    axiosAuthInstance.get(`${BASE_URL_PROFILE}`);
};
