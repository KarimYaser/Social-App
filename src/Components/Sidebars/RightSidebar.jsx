import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faHashtag, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

export default function RightSidebar() {
    const suggestedUsers = [
        { name: 'Sarah Johnson', username: 'sarahj', followers: '2.3k', avatar: 'S', color: 'from-pink-500 to-rose-500' },
        { name: 'Mike Chen', username: 'mikechen', followers: '1.8k', avatar: 'M', color: 'from-green-500 to-emerald-500' },
        { name: 'Emma Wilson', username: 'emmaw', followers: '3.1k', avatar: 'E', color: 'from-orange-500 to-amber-500' },
        { name: 'James Lee', username: 'jameslee', followers: '1.5k', avatar: 'J', color: 'from-indigo-500 to-blue-500' },
    ]

    const trendingTopics = [
        { tag: 'WebDevelopment', posts: '12.5k' },
        { tag: 'ReactJS', posts: '8.2k' },
        { tag: 'TailwindCSS', posts: '6.7k' },
        { tag: 'JavaScript', posts: '15.3k' },
        { tag: 'AI', posts: '9.1k' },
    ]

    return (
        <aside className='sticky top-20 h-fit'>
            {/* Suggested Users */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-4'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Suggested For You</h3>
                    <FontAwesomeIcon icon={faUserPlus} className='text-blue-500' />
                </div>
                <div className='space-y-4'>
                    {suggestedUsers.map((user, index) => (
                        <div key={index} className='flex items-center justify-between group'>
                            <div className='flex items-center gap-3'>
                                <div className={`w-12 h-12 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center text-white font-bold`}>
                                    {user.avatar}
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-800 text-sm'>{user.name}</p>
                                    <p className='text-xs text-gray-500'>@{user.username} • {user.followers}</p>
                                </div>
                            </div>
                            <button className='px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100'>
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
                <button className='w-full mt-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors'>
                    See All Suggestions
                </button>
            </div>

            {/* Trending Topics */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-4'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Trending Topics</h3>
                    <FontAwesomeIcon icon={faArrowTrendUp} className='text-purple-500' />
                </div>
                <div className='space-y-3'>
                    {trendingTopics.map((topic, index) => (
                        <div
                            key={index}
                            className='p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group'
                        >
                            <div className='flex items-center gap-2 mb-1'>
                                <FontAwesomeIcon icon={faHashtag} className='text-blue-500 text-sm' />
                                <p className='font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors'>
                                    {topic.tag}
                                </p>
                            </div>
                            <p className='text-xs text-gray-500 ml-6'>{topic.posts} posts</p>
                        </div>
                    ))}
                </div>
                <button className='w-full mt-4 py-2 text-purple-600 font-medium text-sm hover:bg-purple-50 rounded-lg transition-colors'>
                    Explore More
                </button>
            </div>

            {/* Footer Links */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
                <div className='flex flex-wrap gap-2 text-xs text-gray-500 mb-3'>
                    <a href='#' className='hover:text-blue-600 transition-colors'>About</a>
                    <span>•</span>
                    <a href='#' className='hover:text-blue-600 transition-colors'>Help</a>
                    <span>•</span>
                    <a href='#' className='hover:text-blue-600 transition-colors'>Privacy</a>
                    <span>•</span>
                    <a href='#' className='hover:text-blue-600 transition-colors'>Terms</a>
                    <span>•</span>
                    <a href='#' className='hover:text-blue-600 transition-colors'>Careers</a>
                </div>
                <p className='text-xs text-gray-400'>© 2026 SocialApp. All rights reserved.</p>
            </div>
        </aside>
    )
}
