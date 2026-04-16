import { createContext, useEffect, useState } from "react";
import { api } from "../config/axios.config";
import { getUserFromStorage } from "../utils/getUser.util";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = getUserFromStorage();
    const role = user?.role;

    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ search: "", role: "", status: "" });

    useEffect(() => {

        if (!token) return;

        const fetchData = async () => {

            const query = new URLSearchParams({
                page: currentPage,
                limit: 10,
                ...(filters.role && { role: filters.role }),
                ...(filters.status && { status: filters.status }),
                ...(filters.search && { search: filters.search })
            }).toString();



            if (role === "admin" || role === "manager") {
                try {
                    const res = await api.get(`/api/users?${query}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

     

                    setUsers(res.data.data.users);
                    setPagination(res.data.data.pagination);
                } catch (error) {
                    console.error('❌ API Error:', error.response?.data || error.message);
                }
            } else {
                const res = await api.get("/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data.data.user);
            }
        };

        fetchData();
    }, [token, role, currentPage ,filters]);

    return (
        <UserContext.Provider value={{
            users, setUsers,
            profile, setProfile,
            currentPage, setCurrentPage,
            pagination, filters, setFilters
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;