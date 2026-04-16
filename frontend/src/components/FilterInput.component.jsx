import React from 'react'

const FilterInput = ({ setFilters, filters }) => {

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    return (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex gap-3 flex-wrap items-center">
                <div className="flex-1 min-w-0">
                    <input
                        onChange={(e) => handleChange('search',e.target.value)}
                        value={filters.search || ''}
                        placeholder="Search users by name or email..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 hover:border-gray-300 focus:border-gray-300 focus:outline-none focus:shadow-sm"
                    />
                </div>


                <select
                    value={filters.role || ''}
                       onChange={(e) => handleChange('role',e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-all duration-200 min-w-25"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                </select>


                <select
                    value={filters.status || ''}
                       onChange={(e) => handleChange('status',e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-all duration-200 min-w-25"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <div className="">
                    <button
                        onClick={() => {
                            const resetFilters = { search: '', role: '', status: '' };
                            setFilters(resetFilters);
                        }}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterInput