import http from "./httpService";
// import {apiUrl} from "../config.json";
import jwtDecode from "jwt-decode";

const qs = require('qs');

const config = require("../config.json");

const apiEndpoint = config.apiUrl + "/auth/signin";
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {

    const body = qs.stringify({
        'email': email,
        'password': password
    });

    const { data } = await http.post(apiEndpoint, body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    loginWithJwt(data.token);
}

export function loginWithJwt(jwt) {
    console.log(jwt, "jwt")
    localStorage.setItem(tokenKey, jwt);
}


export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = getJwt();
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

let exports = {
    login, logout, getCurrentUser, loginWithJwt, getJwt
};
export default exports


