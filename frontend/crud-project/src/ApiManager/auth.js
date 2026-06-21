import api from "./api";

export const login = async (email, password) => {
    const res = await api.post("/api/users/login", { email, password });
    return res.data;
};


export const logout = async () => {
    const res = await api.post("/api/users/logout");
    return res.data;
};


export const signup = async (name, email, password) => {
    const res = await api.post("/api/users", { name, email, password });
    return res.data;
}
