import { createContext, useEffect, useState } from "react";
import { api } from "../config/axios.config";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    const [profile, setProfile] = useState(null)


    const role = user?.role

    const [users, setUsers] = useState([]);

    useEffect(() => {

        if (!token) return;
        const fetchData = async () => {

            if (role === "admin" || role === 'manager') {
                const res = await api.get("/api/users/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data.data.users);
            } else {
                const res = await api.get("/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data.data.user);
            }
        }

        fetchData()

    }, [token, role]);


    return (
        <UserContext.Provider value={{ users, setUsers, profile, setProfile, token }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;