import React, { useState, useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import PostCard from '../../Components/PostCard/PostCard'
import LeftSidebar from '../../Components/Sidebars/LeftSidebar'
import RightSidebar from '../../Components/Sidebars/RightSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEdit, faMapMarkerAlt, faLink, faBriefcase, faCalendarDays, faUsers, faHeart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  
  // Mock user data - replace with API data
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: 'John Doe',
    bio: 'Tech enthusiast | Content creator | Always learning',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    profession: 'Full Stack Developer',
    joinDate: 'January 2024',
    photo: 'https://i.pravatar.cc/150?img=1',
    coverImage: 'https://images.unsplash.com/photo-1579546929662-711aa33e3e5c?w=1200&h=400&fit=crop',
    followers: 1250,
    following: 450,
    postsCount: 85
  })

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    bio: userProfile.bio,
    location: userProfile.location,
    website: userProfile.website,
    profession: userProfile.profession
  })

  // Mock posts data
  const [userPosts] = useState([
    {
      id: 1,
      body: 'Just launched my new portfolio website! Check it out and let me know what you think.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      createdAt: '2024-01-15T10:30:00Z',
      user: { name: 'John Doe', photo: userProfile.photo },
      comments: [],
      likes: 150
    },
    {
      id: 2,
      body: 'Working on an exciting new React project. Building scalable applications with modern technologies!',
      image: null,
      createdAt: '2024-01-14T14:20:00Z',
      user: { name: 'John Doe', photo: userProfile.photo },
      comments: [],
      likes: 95
    },
    {
      id: 3,
      body: 'Amazing conference today! Learned so much about web performance optimization.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      createdAt: '2024-01-13T09:15:00Z',
      user: { name: 'John Doe', photo: userProfile.photo },
      comments: [],
      likes: 200
    }
  ])

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setUserProfile(prev => ({ ...prev, ...editForm }))
    setIsEditingProfile(false)
  }

  const handleOpenPostDetails = (post) => {
    navigate(`/postDetails/${post.id}`, { state: { post } })
  }

  return (
    <div className='profile-page bg-gray-100 min-h-screen pb-8'>
      <Navbar />

      <div className='container mx-auto max-w-6xl px-4 py-6'>
        {/* Profile Header Card */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-6'>
          {/* Cover Image */}
          <div className='relative h-64 bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden'>
            <img 
              src={userProfile.coverImage} 
              alt='Cover' 
              className='w-full h-full object-cover'
            />
            <button 
              onClick={() => navigate(-1)}
              className='absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors'
            >
              <FontAwesomeIcon icon={faArrowLeft} className='text-gray-800' />
            </button>
            <button className='absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors'>
              <FontAwesomeIcon icon={faCamera} className='text-gray-800' />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className='relative px-6 pb-6'>
            {/* Avatar */}
            <div className='flex justify-between items-end -mt-20 mb-4'>
              <div className='relative'>
                <img 
                  src={userProfile.photo} 
                  alt={userProfile.name}
                  className='w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover'
                />
                <button className='absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors'>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className='btn bg-blue-500 hover:bg-blue-600'
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit Profile</span>
                </button>
                <button className='btn bg-gray-200 text-gray-800 hover:bg-gray-300'>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Follow</span>
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className='space-y-4'>
              <div>
                {isEditingProfile ? (
                  <input
                    type='text'
                    value={editForm.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className='form-control text-2xl font-bold'
                  />
                ) : (
                  <h1 className='text-3xl font-bold text-gray-800'>{userProfile.name}</h1>
                )}
              </div>

              {isEditingProfile ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleEditChange('bio', e.target.value)}
                  className='form-control text-gray-600'
                  rows='3'
                />
              ) : (
                <p className='text-gray-600 text-lg'>{userProfile.bio}</p>
              )}

              {/* Location, Website, Profession */}
              <div className='flex flex-wrap gap-6 text-gray-600'>
                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='text-blue-500' />
                  {isEditingProfile ? (
                    <input
                      type='text'
                      value={editForm.location}
                      onChange={(e) => handleEditChange('location', e.target.value)}
                      className='form-control text-sm'
                    />
                  ) : (
                    <span>{userProfile.location}</span>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon={faLink} className='text-blue-500' />
                  {isEditingProfile ? (
                    <input
                      type='url'
                      value={editForm.website}
                      onChange={(e) => handleEditChange('website', e.target.value)}
                      className='form-control text-sm'
                    />
                  ) : (
                    <a href={userProfile.website} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
                      {userProfile.website}
                    </a>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon={faBriefcase} className='text-blue-500' />
                  {isEditingProfile ? (
                    <input
                      type='text'
                      value={editForm.profession}
                      onChange={(e) => handleEditChange('profession', e.target.value)}
                      className='form-control text-sm'
                    />
                  ) : (
                    <span>{userProfile.profession}</span>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon={faCalendarDays} className='text-blue-500' />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>

              {/* Save Button */}
              {isEditingProfile && (
                <button 
                  onClick={handleSaveProfile}
                  className='btn bg-green-500 hover:bg-green-600'
                >
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          <div className='bg-white rounded-xl shadow-sm p-6 text-center'>
            <div className='text-3xl font-bold text-blue-500'>{userProfile.postsCount}</div>
            <div className='text-gray-600 mt-2'>Posts</div>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-6 text-center'>
            <div className='flex items-center justify-center gap-1 text-3xl font-bold text-blue-500'>
              <FontAwesomeIcon icon={faUsers} />
              <span>{userProfile.followers.toLocaleString()}</span>
            </div>
            <div className='text-gray-600 mt-2'>Followers</div>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-6 text-center'>
            <div className='text-3xl font-bold text-blue-500'>{userProfile.following.toLocaleString()}</div>
            <div className='text-gray-600 mt-2'>Following</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Sidebar */}
          <div className='hidden lg:block lg:col-span-3'>
            <LeftSidebar />
          </div>

          {/* User Posts Section */}
          <div className='col-span-1 lg:col-span-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Posts</h2>
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <div 
                    key={post.id} 
                    onClick={() => handleOpenPostDetails(post)}
                    className='cursor-pointer transition-transform duration-200 hover:scale-[1.02]'
                  >
                    <PostCard postData={post} commentLimit={3} />
                  </div>
                ))
              ) : (
                <div className='bg-white rounded-2xl shadow-sm p-8 text-center'>
                  <p className='text-gray-500'>No posts yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className='hidden lg:block lg:col-span-3'>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
