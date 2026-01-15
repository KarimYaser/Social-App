import React, { useEffect } from 'react'
import PostCard from '../PostCard/PostCard'
import PostCardSkeleton from '../PostCardSkeleton/PostCardSkeleton'


export default function Feed({ posts, getAllPosts, isLoading }) {
    // Use custom hook for fetching posts

    useEffect(() => {
        // Fetch posts on component mount
        getAllPosts()
    }, []);



    return (
        <>
            <section className='feed-section'>
                <div className="container mx-auto max-w-2xl">
                    <h2 className='text-xl font-semibold text-gray-400'>Latest Posts</h2>
                    <div className="all-posts space-y-5">
                        {/* {isLoading && <PostCardSkeleton />} */}
                        {isLoading ? (
                            [1, 2, 3].map((i) => (
                                <PostCardSkeleton key={i} />
                            ))
                        ) : posts.length > 0 ? (
                            posts.slice(0, 10).map((post) => (
                                <PostCard key={post._id} postData={post} commentLimit={1} />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No posts found</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
