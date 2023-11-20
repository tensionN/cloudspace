import axios from "axios";
import {useUser} from "../modules/users/store";

export const registration = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/registration", {
            email,
            password
        });
        localStorage.setItem("token", response.data.token);
        return response.data.user;
    } catch (e) {
        useUser.getState().logoutUser();
        alert(e.response.data.message)
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password
        });
        localStorage.setItem("token", response.data.token);
        return response.data.user;
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const auth = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/auth", {
            headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}
        });
        localStorage.setItem("token", response.data.token);
        return response.data.user;
    } catch (e) {
        localStorage.removeItem('token')
    }
}