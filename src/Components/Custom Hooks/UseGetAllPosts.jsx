import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Context/Auth.context'

/**
 * Custom hook for fetching all posts
 * @returns {Object} { posts, isLoading, getAllPosts, refetchPosts }
 */
export default function useGetAllPosts() {
    const [posts, setPosts] = useState([]) // All posts
    const [isLoading, setIsLoading] = useState(true) // Loading state
    const { token } = useContext(AuthContext)

    // Fetch all posts from the API
    const getAllPosts = async () => {
        try {
            setIsLoading(true)
            const options = {
                url: 'https://linked-posts.routemisr.com/posts?limit=50&page=98',
                method: 'GET',
                headers: {
                    token: token,
                }
            }
            const { data } = await axios.request(options)
            if (data.message === 'success') {
                setPosts(data.posts.reverse()) // Set posts state with fetched posts reversed
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Alias for getAllPosts to make the API more intuitive
    const refetchPosts = getAllPosts

    return {
        posts,
        isLoading,
        getAllPosts,
        refetchPosts
    }
}
