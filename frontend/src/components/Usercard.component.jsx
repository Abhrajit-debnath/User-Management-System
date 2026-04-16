

import { useContext } from "react";
import { api } from "../config/axios.config";
import { UserContext } from "../context/User.context";
import toast from "react-hot-toast";

const UserCard = ({ user, onEdit }) => {

    const { setUsers, token } = useContext(UserContext);

    console.log(user);
    

    const handledelete = async (userId) => {
        try {
            const res = await api.delete(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(prev => prev.filter(u => u._id !== userId));
            toast.success("User deleted successfully");

        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };


    return (
        <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">


            <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold">{user.name}</h2>

                <div className="flex items-center gap-2">


                    <button
                        onClick={() => onEdit(user)}
                        className="bg-gray-500 capitalize cursor-pointer text-white rounded-full px-2 py-1 text-xs hover:bg-gray-600 transition"
                    >
                        edit
                    </button>

                    <span className={`text-xs px-2 py-1 rounded-full ${user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                        }`}>
                        {user.role}
                    </span>

                </div>
            </div>

            <p className="text-sm text-gray-600">{user.email}</p>

            <div className="text-xs text-gray-500">
                Status: {user.status}
            </div>

            <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                    Created: {new Date(user.createdAt).toLocaleString()}
                </div>

                <button
                    onClick={() => {
                        console.log("CLICK USER:", user)
                        handledelete(user._id)}}
                    className="bg-red-500 capitalize text-white rounded-full px-2 py-1 text-xs hover:bg-red-600 transition"
                >
                    delete
                </button>
            </div>

        </div>
    );
};

export default UserCard;