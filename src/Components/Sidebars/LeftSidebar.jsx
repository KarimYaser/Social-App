import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faCog, faBookmark, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
import { AuthContext } from '../../Context/Auth.context'

export default function LeftSidebar() {
    const { user } = useContext(AuthContext)

    const navItems = [
        { icon: faHome, label: 'Home', path: '/' },
        { icon: faUser, label: 'Profile', path: '/profile' },
        { icon: faUsers, label: 'Network', path: '/network' },
        { icon: faHashtag, label: 'Explore', path: '/explore' },
        { icon: faBookmark, label: 'Saved', path: '/saved' },
        { icon: faCog, label: 'Settings', path: '/settings' },
    ]

    return (
        <aside className='sticky top-20 h-fit'>
            {/* User Profile Card */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-4'>
                <div className='text-center'>
                    <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3'>
                        {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <h3 className='font-bold text-lg text-gray-800'>
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <p className='text-sm text-gray-500 mb-4'>@{user?.userName || 'username'}</p>
                    <div className='flex justify-around text-center pt-4 border-t border-gray-200'>
                        <div>
                            <p className='font-bold text-lg text-gray-800'>245</p>
                            <p className='text-xs text-gray-500'>Posts</p>
                        </div>
                        <div>
                            <p className='font-bold text-lg text-gray-800'>1.2k</p>
                            <p className='text-xs text-gray-500'>Followers</p>
                        </div>
                        <div>
                            <p className='font-bold text-lg text-gray-800'>890</p>
                            <p className='text-xs text-gray-500'>Following</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className='bg-white rounded-2xl shadow-lg p-4'>
                <nav className='space-y-2'>
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className='flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group'
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                className='text-gray-600 group-hover:text-blue-600 transition-colors w-5'
                            />
                            <span className='font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Quick Stats */}
            <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 mt-4 text-white'>
                <h4 className='font-bold text-lg mb-3'>Your Activity</h4>
                <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm opacity-90'>Profile Views</span>
                        <span className='font-bold text-lg'>342</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm opacity-90'>Post Impressions</span>
                        <span className='font-bold text-lg'>5.2k</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm opacity-90'>Engagement Rate</span>
                        <span className='font-bold text-lg'>12.5%</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
