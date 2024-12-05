import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { GetCookie } from '../Functions/GetCookie';

const baseURL = "http://localhost:8080";
const REST_API_BASE_URL_AUTH = `http://localhost:8080/api/v1/auth`;
const FORGOTPASSWORD_BASE_URL = `http://localhost:8080/forgotPassword`;

// // API for register 
export const register = (name, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/register`, {
        name, email, password
    });
  };


  // API for login
  export const login = (email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login`, {
        email, password
    });
  };


    // API to send email with an OTP when forgot password.
    export const sendOTP = (email) => {
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyMail/${email}`)
    } 
  
    // API for verify OTP.
    export const verifyOTP = (otp, email, ) => {
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyOtp/${otp}/${email}`)
    }
  
    //API for Change password.
    export const changePassword = (email, password, repeatPassword) =>{
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/changePassword/${email}`,{
        password, repeatPassword
      });
    };

  
const axiosAuthInstance = axios.create({
  baseURL,
})

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    // Get the token from localStorage (or wherever you store it)
    //  const token = localStorage.getItem('token');
    const token = GetCookie("accessToken");
    // Set the authorization header if a token exists
    if (token) {
      const user = jwtDecode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      console.log(isExpired);
      if(!isExpired){
        config.headers.Authorization = `Bearer ${token}`;
        // return config;
      }else {
        
        // console.log("Access token expired");
        // const refreshToken = localStorage.getItem('refreshToken');
        const refreshToken = GetCookie("refreshToken");
        const response = await axios.post(`${REST_API_BASE_URL_AUTH}/refresh`, {refreshToken})
        console.log(response);

        console.log("Token updated.")
        // console.log(response.data.accessToken);
        // localStorage.setItem('token', response.data.accessToken);
        // localStorage.setItem('refreshToken', response.data.refreshToken);

        document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/;`;


        // const token = localStorage.getItem('token');
        const token = GetCookie("accessToken");

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    }
    else{
      LogoutUser(); // need to login again.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;

//logout the user from the application.
export const LogoutUser = () => { 
  
//   localStorage.removeItem('token');
//   localStorage.removeItem('refreshToken');

  document.cookie = `accessToken=; path=/;`;
  document.cookie = `refreshToken=; path=/;`;

//   localStorage.removeItem('userEmail');
}