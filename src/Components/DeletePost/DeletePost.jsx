import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function DeletePost({ postId, onDeleteSuccess, onCancel }) {
    const { token } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    // Handle post deletion
    async function handleDelete() {
        setLoading(true)

        try {
            const options = {
                url: `https://linked-posts.routemisr.com/posts/${postId}`,
                method: 'DELETE',
                headers: {
                    token: token,
                },
            }

            const { data } = await axios.request(options)
            if (data.message === 'success') {
                toast.success('Post deleted successfully')
                if (onDeleteSuccess) {
                    onDeleteSuccess() // Refresh posts and close dialog
                }
            }

        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                {/* Confirmation Dialog */}
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-600 text-3xl" />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        Delete Post?
                    </h3>

                    {/* Message */}
                    <p className="text-gray-600 text-center mb-6">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition"
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
