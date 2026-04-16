

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Statcard from "./Statcard.component"
import { UserContext } from "../context/User.context"
import UserCard from "./Usercard.component"
import EditUserForm from "./Edituser.component"
import CreateUserForm from "./CreateUser.component"

const Dashboard = () => {
    const [view, setView] = useState(false)
    const navigate = useNavigate()
    const [openEditModal, setopenEditModal] = useState(false)
    const [openCreateModal, setopenCreateModal] = useState(false)
    const [selectedUser, setselectedUser] = useState(null)
    const { users } = useContext(UserContext)
    const activeUsers = users?.filter(u => u.status !== "inactive")
    const inactiveUsers = users?.filter(u => u.status !== "active")
    const user = JSON.parse(localStorage.getItem("user"))
    const userRole = user?.role || "user"

    const isAdmin = userRole === 'admin'
    const isManager = userRole === "manager";

    const filteredUsers = isManager
        ? users.filter(u => u.role !== "admin")
        : users;


    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {openEditModal && (

                <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

                    <div className=" rounded-xl shadow-lg w-full  p-6 relative">

                        <EditUserForm
                            user={selectedUser}
                            onClose={() => setopenModal(false)}
                        />

                    </div>

                </div>
            )}

            {openCreateModal && (

                <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

                    <div className=" rounded-xl flex justify-center items-center shadow-lg w-full  p-6 relative">

                        <CreateUserForm

                            onClose={() => setopenCreateModal(false)}
                        />

                    </div>

                </div>
            )}





            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UM</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">
                        User Management
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        👋 Hello,{" "}
                        <span className="font-semibold text-gray-700">
                            {user?.name}
                        </span>
                    </span>

                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${user?.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : user?.role === "manager"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                        {user?.role}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>


            <div className="max-w-6xl mx-auto px-8 py-10">


                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isAdmin
                            ? "Admin Dashboard"
                            : isManager
                                ? "Manager Dashboard"
                                : "My Dashboard"}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {isAdmin
                            ? "Manage all users and system settings"
                            : isManager
                                ? "View and manage users"
                                : "View your profile"}
                    </p>
                </div>


                {(isAdmin || isManager) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Statcard
                            title="Total Users"
                            value={users?.length}
                            icon="👥"
                            color="border-blue-500"
                        />
                        <Statcard
                            title="Active Users"
                            value={activeUsers?.length}
                            icon="✅"
                            color="border-green-500"
                        />
                        <Statcard
                            title="Inactive Users"
                            value={inactiveUsers?.length}
                            icon="🚫"
                            color="border-red-500"
                        />
                    </div>
                )}


                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Quick Actions
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {(isManager) && (
                            <button
                                onClick={() => setView((prev) => !prev)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
                            >
                                👥 View All Users
                            </button>
                        )}

                        {isAdmin && (
                            <button
                                onClick={() => setopenCreateModal(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
                            >
                                ➕ Create User
                            </button>
                        )}

                        {(!isAdmin && !isManager) && <button
                            onClick={() => navigate("/profile")}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                        >
                            👤 My Profile
                        </button>}

                    </div>
                </div>


                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-blue-700 mb-2">
                        Your Permissions
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {isAdmin &&
                            ["Create Users", "Edit Users", "Delete Users", "View All Users", "Assign Roles"].map(p => (
                                <span key={p} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                    {p}
                                </span>
                            ))}
                        {["View All Users", "Edit Users"].map(p => (
                            <span key={p} className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                                {p}
                            </span>
                        ))}

                        {!isAdmin && !isManager && (
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                View & Edit Own Profile
                            </span>
                        )}
                    </div>
                </div>


                {view && (
                    <div className="mt-6">
                        <div className="max-h-[60vh] overflow-y-auto pr-2">

                            {filteredUsers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                                    <span className="text-4xl mb-2">👤</span>
                                    <p>No users found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredUsers.map(u => (
                                        <UserCard
                                            key={u._id}
                                            user={u}
                                            onEdit={(user) => {
                                                setselectedUser(user);
                                                setopenEditModal(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard