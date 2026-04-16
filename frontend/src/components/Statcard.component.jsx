import React from 'react'

const Statcard = ({ title, value, icon, color }) => {
    return (

        <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
                <span className="text-4xl">{icon}</span>
            </div>
        </div>

    )
}

export default Statcard
