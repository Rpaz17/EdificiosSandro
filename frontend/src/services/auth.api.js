import api from "./api";

export async function login(email, password){
    const res = await api.post("/auth/login", { email, password });
    const {token, usuario} = res.data;

    localStorage.setItem("token", token);
    return { token, usuario };
}

export function saveSession({ token, usuario }, rememberMe){
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("usuario", JSON.stringify(usuario));
}

export function getToken(){
    return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export async function getCurrentUser(){
    const res = await api.get("/auth/me");
    return res.data.usuario;
}

export async function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
}