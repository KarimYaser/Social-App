import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios';
import PostCard from '../../Components/PostCard/PostCard';
import PostCardSkeleton from '../../Components/PostCardSkeleton/PostCardSkeleton';

export default function PostDetails() {

  const { id } = useParams()
  const { token } = useContext(AuthContext);
  
  const [postDetails, setPostDetails] = useState(null)

  async function getPostDetails() {
    try {
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
  }
  useEffect(() => {
    getPostDetails();
  }, [])
  // }, [id, token])
  return (
    <>
      <section>
        <div className="container max-w-3xl mx-auto">
          {postDetails ? <PostCard postData={postDetails} commentLimit={10} /> : <PostCardSkeleton />}
          </div>
      </section>
    </>
  )
}
