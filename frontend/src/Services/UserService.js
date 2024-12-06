import axiosAuthInstance from "./AuthService";

const BASE_URL_USER = `http://localhost:8080/api/v1/user`;

export const getUserDetails = () => {
    return axiosAuthInstance.get(`${BASE_URL_USER}`);
};

export const updateUserName = (name) => {
    return axiosAuthInstance.patch(`${BASE_URL_USER}`,{name});
}