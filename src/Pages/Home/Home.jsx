import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Feed from '../../Components/Feed/Feed'
import PostUpload from '../../Components/PostUpload/PostUpload'
import LeftSidebar from '../../Components/Sidebars/LeftSidebar'
import RightSidebar from '../../Components/Sidebars/RightSidebar'
import useGetAllPosts from '../../Components/Custom Hooks/UseGetAllPosts'

export default function Home() {
  const { posts, getAllPosts, isLoading } = useGetAllPosts()
  return (
    <div className='home-page bg-gray-100 min-h-screen'>
      <Navbar />

      {/* Three Column Layout */}
      <div className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Sidebar - Hidden on mobile/tablet, visible on large screens */}
          <div className='hidden lg:block lg:col-span-3'>
            <LeftSidebar />
          </div>

          {/* Main Content - Full width on mobile, centered on large screens */}
          <div className='col-span-1 lg:col-span-6'>
            <PostUpload getAllPosts={getAllPosts} />
            <Feed posts={posts} getAllPosts={getAllPosts} isLoading={isLoading} />
          </div>

          {/* Right Sidebar - Hidden on mobile/tablet, visible on large screens */}
          <div className='hidden lg:block lg:col-span-3'>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
