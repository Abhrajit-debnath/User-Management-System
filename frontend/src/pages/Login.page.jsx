import React from 'react'
import Login from '../components/Login.component'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
        <div className="fixed flex items-center gap-3 top-50">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UM</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 capitalize">User Management system</h1>
                </div>
        <Login/>
    </div>
  )
}

export default LoginPage
