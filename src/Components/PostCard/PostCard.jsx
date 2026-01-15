import { faEllipsisVertical, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment, faShareFromSquare, faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentCard from '../CommentCard/CommentCard'
import noImage from '../../assets/no-image.png'
import { Link } from 'react-router'
import noUserPhoto from '../../assets/profile.png'

export default function PostCard({ postData, commentLimit }) {

    const postDataImage = postData?.image ? postData.image : noImage
    const userPhoto = postData?.user?.photo ? postData.user.photo : noUserPhoto
    return (
        <>
            <div className="post-card bg-white shadow-lg rounded-2xl p-8 my-6">
                <header className='post-card-header flex justify-between items-center'>
                    <div className="flex items-center">
                        <div className="avatar-image rounded-full w-10 h-10 bg-gray-300 overflow-hidden">
                            <img src={userPhoto} alt="" />
                        </div>
                        <div className="post-card-user-info  mx-4">
                            <h3 className="post-card-username font-semibol d">{postData?.user?.name}</h3>
                            <time className="post-card-timestamp text-sm text-gray-500">
                                <Link to={`/postDetails/${postData?.id}`}>{postData?.createdAt ? new Date(postData.createdAt).toLocaleString() : ''}</Link>
                            </time>
                        </div>
                    </div>
                    <button className="post-card-button">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                </header>
                {
                    postData?.image ? (
                        <div className="post-info mt-4">
                            <figurecaption className='post-caption text-gray-600'>
                                {postData.body}
                            </figurecaption>
                            <div className='-mx-8 mt-4 rounded-lg overflow-hidden'>
                                <img src={postDataImage} alt=""
                                    className='w-full h-100 object-cover object-center ' />
                            </div>
                        </div>
                    ) : (
                        <figurecaption className='post-caption font-bold text-gray-600'>
                            {postData.body}
                        </figurecaption>
                    )
                }
                <div className="reactions">
                    <div className="flex items-center justify-between mt-4">
                        <div className="icons *:cursor-pointer flex items-center gap-1 *:hover:scale-110 transition-transform duration-300">
                            <FontAwesomeIcon icon={faThumbsUp} className='text-white text-sm bg-blue-500 rounded-full p-1.5' />
                            <FontAwesomeIcon icon={faHeart} className='text-white text-sm bg-red-500 rounded-full p-1.5' />
                            <span className='ml-1 text-gray-600'>150 Likes</span>
                        </div>
                        <span className='ml-2 text-gray-600'>{postData?.comments?.length ?? 0} comments</span>
                    </div>
                </div>
                <div className="action-btns -mx-8 flex justify-between items-center mt-4 pt-2 border-t border-b border-gray-200">
                    <button className="like-btn cursor-pointer flex items-center justify-center gap-2 p-2 w-full hover:bg-gray-100 rounded-md">
                        <FontAwesomeIcon icon={faThumbsUpRegular} />
                        <span>Like</span>
                    </button>
                    <button className="comment-btn cursor-pointer flex items-center justify-center gap-2 p-2 w-full hover:bg-gray-100 rounded-md">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comment</span>
                    </button>
                    <button className="share-btn cursor-pointer flex items-center justify-center gap-2 p-2 w-full hover:bg-gray-100 rounded-md">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span>Share</span>
                    </button>
                </div>
                <section className="comments flex flex-col gap-4 w-full">
                    {postData?.comments?.length > 0 ? postData.comments.slice(0, commentLimit).map((comment) => (
                        <CommentCard key={comment._id} name={comment.commentCreator.name} avatar={comment.commentCreator.photo}
                            content={comment.content}
                            timestamp={comment.createdAt} />
                    )) : <p className='mt-4 bg-gray-100 text-gray-500 rounded-2xl w-full p-4'>No comments</p>
                    }
                    <Link to={`/postDetails/${postData?.id}`} className='text-center bg-gray-100 shadow w-full cursor-pointer my-3 text-blue-600 px-2 py-1 rounded-md'>Show All Comments ({postData?.comments?.length ?? 0})</Link>
                </section>
            </div>
        </>
    )

}