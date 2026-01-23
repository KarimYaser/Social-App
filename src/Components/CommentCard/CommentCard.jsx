import userPhoto from '../../assets/profile.png'
import { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import EditComment from '../EditComment/EditComment'
import DeleteComment from '../DeleteComment/DeleteComment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function CommentCard({ commentData, name, avatar, content, timestamp, onRefresh }) {
    const { user } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const menuRef = useRef(null)

    // Check if current user owns this comment
    const isOwner = user?.id === commentData?.commentCreator?.id || user?._id === commentData?.commentCreator?._id

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

    const commentCreatorPhoto = avatar?.includes("undefined") ? userPhoto : avatar

    return (
        <>
            <div className="comment flex items-start gap-4 mt-4">
                <img src={commentCreatorPhoto} alt=""
                    className='size-12 rounded-full' />
                <div className="comment-body grow">
                    {/* Edit Mode */}
                    {isEditing ? (
                        <EditComment
                            commentData={commentData}
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
                            <div className="comment bg-gray-100 min-w-full shadow rounded-lg p-4 relative">
                                <div className="flex justify-between items-start">
                                    <div className="grow">
                                        <h4 className="font-semibold">{name}</h4>
                                        <p className='text-gray-600'>{content}</p>
                                    </div>

                                    {/* Edit/Delete Menu */}
                                    {isOwner && (
                                        <div className="relative" ref={menuRef}>
                                            <button
                                                onClick={() => setShowMenu(!showMenu)}
                                                className="hover:bg-gray-200 rounded-full p-1.5 transition"
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-600" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {showMenu && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(true)
                                                            setShowMenu(false)
                                                        }}
                                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 transition text-sm"
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowDeleteDialog(true)
                                                            setShowMenu(false)
                                                        }}
                                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 transition border-t border-gray-200 text-sm"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                                        <span className="text-red-500">Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="comment-actions flex items-center gap-4 text-sm text-gray-500 mt-2 ml-1">
                                <span className="comment-timestamp">{new Date(timestamp).toLocaleString()}</span>
                                <button className="like-comment-btn hover:underline cursor-pointer">Like</button>
                                <button className="reply-comment-btn hover:underline cursor-pointer">Reply</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <DeleteComment
                    commentId={commentData?._id}
                    onDeleteSuccess={() => {
                        setShowDeleteDialog(false)
                        if (onRefresh) {
                            onRefresh()
                        }
                    }}
                    onCancel={() => setShowDeleteDialog(false)}
                />
            )}
        </>
    )
}
