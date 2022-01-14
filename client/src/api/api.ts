import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const requestInterceptor = (req: AxiosRequestConfig) => {
	return req;
};

const responseInterceptor = (res: AxiosResponse) => {
	return res;
};

const api = axios.create({
	baseURL: "s",
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor);

export default api;
