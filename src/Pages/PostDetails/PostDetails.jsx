import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios';
import PostCard from '../../Components/PostCard/PostCard';
import PostCardSkeleton from '../../Components/PostCardSkeleton/PostCardSkeleton';

export default function PostDetails() {

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  
  const [postDetails, setPostDetails] = useState(location.state?.post || null)
  const [isLoading, setIsLoading] = useState(!location.state?.post)

  async function getPostDetails() {
    try {
      setIsLoading(true)
      const options = {
        url: `https://linked-posts.routemisr.com/posts/${id}`,
        method: "GET",
        headers: {
          token: token
        }
      }
      const { data } = await axios.request(options)
      // console.log(data);
      if (data.message === "success") {
        setPostDetails(data.post);
      }

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    // Only fetch from API if we don't have post data from navigation
    if (!location.state?.post) {
      getPostDetails();
    }
  }, [id, token, location.state])
  
  return (
    <>
      <section>
        <div className="container max-w-3xl mx-auto px-4 py-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 px-4 py-2 text-blue-500 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>
          {isLoading ? <PostCardSkeleton /> : postDetails ? <PostCard postData={postDetails} commentLimit={10} /> : <PostCardSkeleton />}
        </div>
      </section>
    </>
  )
}
