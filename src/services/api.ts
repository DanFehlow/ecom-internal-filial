import axios, { AxiosInstance, AxiosError } from "axios";

const baseURL = "http://localhost:3333";
//const baseURL = "https://b2b9-2804-1b3-a601-fb0-ccc7-e281-f9e0-a723.ngrok-free.app/";


const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirecionar o usuário para a página de login
    } else {
      console.log("Erro");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
