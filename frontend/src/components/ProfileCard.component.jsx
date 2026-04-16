import React, { useContext } from 'react'
import { UserContext } from '../context/User.context'

const ProfileCard = ({ setopenEditModal }) => {
    const { profile } = useContext(UserContext)
    
    return (
        <div className="mt-6 bg-white rounded-2xl p-6  border border-gray-300 w-md">
            <div className="flex justify-between">
                <h3 className="font-semibold text-lg mb-3">My Profile</h3>
                <div className="capitalize cursor-pointer" onClick={() => setopenEditModal(true)}>Edit</div>
            </div>
            <p><span className="text-gray-500">Name:</span> {profile.name}</p>
            <p><span className="text-gray-500">Email:</span> {profile.email}</p>
            <p><span className="text-gray-500">Role:</span> {profile.role}</p>
            <p><span className="text-gray-500">Status:</span> {profile.status}</p>
        </div>
    )
}

export default ProfileCard
