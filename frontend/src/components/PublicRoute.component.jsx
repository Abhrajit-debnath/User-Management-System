
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const PublicRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    if (!token) return null;

    return children;
}

export default PublicRoute
