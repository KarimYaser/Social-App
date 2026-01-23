import { faEllipsisVertical, faHeart, faThumbsUp, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faComment, faShareFromSquare, faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentCard from '../CommentCard/CommentCard'
import AddComment from '../AddComment/AddComment'
import EditPost from '../EditPost/EditPost'
import DeletePost from '../DeletePost/DeletePost'
import noImage from '../../assets/no-image.png'
import { Link } from 'react-router'
import noUserPhoto from '../../assets/profile.png'
import { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../Context/Auth.context'

export default function PostCard({ postData, commentLimit, onRefresh }) {
    const { user } = useContext(AuthContext)
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const menuRef = useRef(null)

    // Check if current user owns this post
    const isOwner = user?.id === postData?.user?.id || user?._id === postData?.user?._id

    // Close dropdown menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showMenu])

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
                    {isOwner && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="post-card-button hover:bg-gray-100 rounded-full p-2 transition"
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>

                            {/* Dropdown Menu */}
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <button
                                        onClick={() => {
                                            setIsEditing(true)
                                            setShowMenu(false)
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 transition"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500" />
                                        <span>Edit Post</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDeleteDialog(true)
                                            setShowMenu(false)
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 transition border-t border-gray-200"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                        <span className="text-red-500">Delete Post</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </header>

                {/* Edit Mode */}
                {isEditing ? (
                    <EditPost
                        postData={postData}
                        onUpdateSuccess={() => {
                            setIsEditing(false)
                            if (onRefresh) {
                                onRefresh()
                            }
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <>
                        {/* Normal Post View */}
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
                            <button
                                onClick={() => setShowCommentBox(!showCommentBox)}
                                className="comment-btn cursor-pointer flex items-center justify-center gap-2 p-2 w-full hover:bg-gray-100 rounded-md">
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
                                <CommentCard
                                    key={comment._id}
                                    commentData={comment}
                                    name={comment.commentCreator.name}
                                    avatar={comment.commentCreator.photo}
                                    content={comment.content}
                                    timestamp={comment.createdAt}
                                    onRefresh={onRefresh}
                                />
                            )) : <p className='mt-4 bg-gray-100 text-gray-500 rounded-2xl w-full p-4'>No comments</p>
                            }
                            <Link to={`/postDetails/${postData?.id}`} className='text-center bg-gray-100 shadow w-full cursor-pointer my-3 text-blue-600 px-2 py-1 rounded-md'>Show All Comments ({postData?.comments?.length ?? 0})</Link>
                        </section>

                        {/* Add Comment Component */}
                        {showCommentBox && (
                            <AddComment
                                postId={postData?.id}
                                onCommentAdded={() => {
                                    if (onRefresh) {
                                        onRefresh() // Refresh the posts to show new comment
                                    }
                                    setShowCommentBox(false) // Hide comment box after posting
                                }}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <DeletePost
                    postId={postData?.id || postData?._id}
                    onDeleteSuccess={() => {
                        setShowDeleteDialog(false)
                        if (onRefresh) {
                            onRefresh() // Refresh posts after deletion
                        }
                    }}
                    onCancel={() => setShowDeleteDialog(false)}
                />
            )}
        </>
    )

}