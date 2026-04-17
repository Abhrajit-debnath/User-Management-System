
import { api } from '../config/axios.config'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';



const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await api.post(`/api/auth/login`, data)
            const token = res.data.data.token
            toast.success("User loggedIn successfully")
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            const role = res.data.data.user.role
            if (role) navigate("/dashboard")


        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong"
            toast.error(message)

        }

    }
    return (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border-gray-500 border">
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
        </div>
    )
}

export default Login
