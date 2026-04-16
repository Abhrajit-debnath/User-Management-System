import { useForm } from "react-hook-form";
import { api } from "../config/axios.config";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../context/User.context";

const CreateUserForm = ({ onClose,setView }) => {

    const { setUsers, token } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await api.post("/api/users/", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const createdUser = res.data.data
            setUsers(prev => [...prev, createdUser])
            toast.success("User created successfully")
            reset()
            setView(true)
            onClose()

        } catch (error) {
            toast.error(error.response?.data?.message || "Creation failed");
        }
    };

    return (
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">


            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create User</h2>
                <button className="text-lg cursor-pointer" onClick={onClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full mt-1 border px-3 py-2 rounded-lg"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name.message}</p>
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
                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                </div>


                <div>
                    <label className="text-sm font-medium pr-2">Password</label>
                    <span className="text-sm font-medium pr-2">(optional)</span>
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


                <div>
                    <label className="text-sm font-medium">Role</label>
                    <select
                        {...register("role")}
                        className="w-full mt-1 border px-3 py-2 rounded-lg"
                    >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>


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


                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    {isSubmitting ? "Creating..." : "Create User"}
                </button>

            </form>
        </div>
    );
};

export default CreateUserForm;