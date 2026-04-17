
import { api } from '../config/axios.config'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../context/User.context';



const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {

        try {
            const res = await api.post(`/api/auth/login`, data)
            const token = res.data.data.token
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            toast.success("User logged in successfully")
            navigate("/dashboard")



        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong"
            toast.error(message)

        }

    }
    return (

        <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-3 top-50 pb-10">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UM</span>
                </div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800 capitalize">User Management system</h1>
            </div>
            <div className=" bg-white p-6 rounded-xl shadow-md border-gray-500 border">

                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {
                            ...register("email", {
                                required: "Email is required", pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })
                            }
                            type="email"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            {
                            ...register("password", {
                                required: "Password is required", minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })
                            }
                            type="password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isSubmitting ? "Logging In" : "Login"}
                    </button>
                </form>
            </div></div>
    )
}

export default Login
