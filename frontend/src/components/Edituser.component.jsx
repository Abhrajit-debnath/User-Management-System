import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/User.context";
import { api } from "../config/axios.config";
import toast from "react-hot-toast";


const EditUserForm = ({ editState, user, onClose }) => {
    const isProfileEdit = editState === 'profileEdit';
    const { token, users, setUsers, setProfile } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm(
        );

    useEffect(() => {
        if (!isProfileEdit) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            });
        } else {
            reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, reset, editState]);


    const onSubmit = async (data) => {
        const payload = isProfileEdit ? {
            name: data.name,
            email: data.email,
            ...(data.password ? { password: data.password } : {})
        } : data

        try {
            if (editState === 'profileEdit') {
                const res = await api.put(`/api/users/profile/`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(res);


                const updatedProfile = res.data.data.user;

                if (!updatedProfile) {
                    toast.error("Invalid response from server");
                    return;
                }

                setProfile(updatedProfile);
                toast.success("Profile updated successfully");
                onClose();
            } else {
                const res = await api.put(`/api/users/${user._id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });



                const updatedUser = res.data.data.user;

                if (!updatedUser) {
                    toast.error("Invalid response from server");
                    return;
                }

                setUsers(prev =>
                    prev.map(u =>
                        u._id === updatedUser._id ? updatedUser : u
                    )
                );
                toast.success("User updated successfully");
                onClose();
            }



        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="flex justify-center items-center">

            <div className="w-full max-w-md p-6 rounded-xl shadow-md bg-white">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit User</h2>
                    <button className="text-lg cursor-pointer" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-5 rounded-2xl relative">

                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full mt-1 border px-3 py-2 rounded-lg"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email"
                                }
                            })}
                            className="w-full mt-1 border px-3 py-2 rounded-lg"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>


                    {
                        !isProfileEdit && (
                            <div>
                                <label className="text-sm font-medium">Role</label>
                                <select
                                    {...register("role")}
                                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        )
                    }



                    {
                        isProfileEdit && (
                            <div>
                                <label className="text-sm font-medium pr-2">Password</label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        minLength: {
                                            value: 8,
                                            message: "Minimum 8 characters"
                                        }
                                    })}
                                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                                )}
                            </div>
                        )
                    }

                    {
                        !isProfileEdit && (
                            <div>
                                <label className="text-sm font-medium">Status</label>
                                <select
                                    {...register("status")}
                                    className="w-full mt-1 border px-3 py-2 rounded-lg"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isSubmitting ? "Updating..." : "Update User"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditUserForm;