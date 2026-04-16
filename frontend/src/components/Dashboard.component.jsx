import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Statcard from "./Statcard.component"
import { UserContext } from "../context/User.context"
import UserCard from "./Usercard.component"
import EditUserForm from "./Edituser.component"
import CreateUserForm from "./CreateUser.component"
import ProfileCard from "./ProfileCard.component"
import { useUserState } from "../hooks/useUserState"
import FilterInput from "./FilterInput.component"

const Dashboard = () => {
    const [view, setView] = useState(true)
    const navigate = useNavigate()
    const [openEditModal, setopenEditModal] = useState(false)
    const [openCreateModal, setopenCreateModal] = useState(false)
    const [editState, setEditState] = useState(null)
    const [selectedUser, setselectedUser] = useState(null)

    const [openMenu, setopenMenu] = useState(false)
    const { users } = useContext(UserContext)
    const { user, profile, isAdmin, isManager, safeUsers, filteredUsers, setFilters, inactiveUsers, filters, activeUsers } = useUserState()

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }, [navigate])

    
    return (
        <div className="min-h-screen bg-gray-50">
            {openEditModal && (

                <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

                    <div className=" rounded-xl shadow-lg w-full  p-6 relative">
                        {

                            <EditUserForm
                                editState={editState}
                                user={selectedUser || profile}
                                onClose={() => setopenEditModal(false)}
                            />

                        }


                    </div>

                </div>
            )}

            {openCreateModal && (

                <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

                    <div className=" rounded-xl flex justify-center items-center shadow-lg w-full  p-6 relative">

                        <CreateUserForm
                            setView={setView}
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
                    <h1 className="text-xl font-bold text-gray-800">User Management</h1>
                </div>

                <button
                    className="md:hidden p-1 -m-1 relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    onClick={() => setopenMenu(prev => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={openMenu}
                >
                    <div className={`hamburger w-6 h-5 flex flex-col justify-center gap-1.5 transition-all duration-300 ${openMenu ? 'opacity-50' : 'opacity-100'
                        }`}>
                        <span className={`hamburger-line block w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${openMenu
                            ? 'rotate-45 translate-y-1.5'
                            : 'rotate-0 scale-100'
                            }`}></span>
                        <span className={`hamburger-line block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${openMenu ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                            }`}></span>
                        <span className={`hamburger-line block w-6 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${openMenu
                            ? '-rotate-45 -translate-y-1.5'
                            : 'rotate-0 scale-100'
                            }`}></span>
                    </div>
                </button>

                <div className="hidden md:flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        👋 Hello, <span className="font-semibold text-gray-700">{user?.name}</span>
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${user?.role === "admin" ? "bg-red-100 text-red-600" :
                        user?.role === "manager" ? "bg-yellow-100 text-yellow-600" :
                            "bg-green-100 text-green-600"
                        }`}>
                        {user?.role}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>


            {openMenu && (
                <>

                    <div
                        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                        onClick={() => setopenMenu(false)}
                        aria-hidden="true"
                    />


                    <div className="md:hidden fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out">

                        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">UM</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg">👋 Hello, {user?.name}</h3>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${user?.role === "admin" ? "bg-red-100 text-red-600" :
                                            user?.role === "manager" ? "bg-yellow-100 text-yellow-600" :
                                                "bg-green-100 text-green-600"
                                            }`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setopenMenu(false)}
                                    className="p-2 -m-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div className="p-6 pt-2 overflow-y-auto h-full">
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        setView(prev => !prev);
                                        setopenMenu(false);
                                    }}
                                    className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all duration-200 text-left"
                                >
                                    <span className="text-xl">👥</span>
                                    <span className="font-medium text-gray-800">View All Users</span>
                                </button>

                                {isAdmin && (
                                    <button
                                        onClick={() => {
                                            setopenCreateModal(true);
                                            setopenMenu(false);
                                        }}
                                        className="w-full flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-sm transition-all duration-200 text-left"
                                    >
                                        <span className="text-xl">➕</span>
                                        <span className="font-medium text-gray-800">Create User</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setopenMenu(false);
                                    }}
                                    className="w-full flex items-center gap-3 p-4 bg-linear-to-r from-red-50 to-red-100 border border-red-200 rounded-xl hover:shadow-sm transition-all duration-200 text-left"
                                >
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="font-medium text-gray-800">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}


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
                        {(isManager || isAdmin) && (
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
                            onClick={() => setView(prev => !prev)}
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
                        {isManager && ["View All Users", "Edit Users"].map(p => (
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

                {isAdmin && (
                    <FilterInput setFilters={setFilters} filters={filters} />
                )}

                {view && (isAdmin || isManager) && filteredUsers.length > 0 ?

                    (
                        <div className="mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto max-h-90">
                                {filteredUsers.map(user => (
                                    <UserCard
                                        key={user._id}
                                        user={user}
                                        onEdit={user => {
                                            setselectedUser(user)
                                            setopenEditModal(true)
                                        }}
                                    />
                                ))}
                            </div>


                            <div className="mt-8 p-6 bg-gray-50 rounded-2xl text-center">
                                <p className="text-sm text-gray-600">
                                    Showing <span className="font-bold">{filteredUsers.length}</span> of{' '}
                                    <span className="font-bold">{safeUsers.length}</span> users
                                </p>
                            </div>
                        </div>
                    ) : <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                        <span className="text-4xl mb-2">👤</span>
                        <p>No users found</p>
                    </div>}

                {view && (!isAdmin && !isManager && profile) && (
                    <div className="flex">
                        <ProfileCard setopenEditModal={setopenEditModal} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard