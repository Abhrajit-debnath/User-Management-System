import { createContext, useEffect, useState } from "react";
import { api } from "../config/axios.config";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const token = localStorage.getItem("token")
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await api.get("/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res);
            
            setUsers(res.data.data.users);

          
            
        };

        fetchUsers();
    }, []);


    return (
        <UserContext.Provider value={{ users, setUsers ,token}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;