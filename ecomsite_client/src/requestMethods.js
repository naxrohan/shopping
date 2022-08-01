import axios from "axios";

const BASE_URL = "https://shopsite1.herokuapp.com/api/";

const storeData = JSON.parse(localStorage.getItem("persist:root"));
const currentUser = storeData !== null 
    ? storeData.user !== null ? JSON.parse(storeData.user).currentUser : null
    : null;

const B_TOKEN = currentUser !== null ? currentUser.accessToken : "xyz";


export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {
        token: `Bearer ${B_TOKEN}` 
    }
});