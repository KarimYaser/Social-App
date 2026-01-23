import React, { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios'
import FormField from '../ui/FormField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

export default function AddComment({ postId, onCommentAdded }) {
    const { token, user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const textareaRef = useRef(null)

    // Validation schema for comment
    const validationSchema = yup.object({
        content: yup.string()
            .required('Comment is required')
            .min(1, 'Comment must be at least 1 character')
            .max(500, 'Comment must be at most 500 characters'),
    })

    // Handle comment submission
    async function handleSubmit(values) {
        setError('')
        setLoading(true)

        try {
            const options = {
                url: 'https://linked-posts.routemisr.com/comments',
                method: 'POST',
                headers: {
                    token: token,
                },
                data: {
                    content: values.content,
                    post: postId
                },
            }

            const { data } = await axios.request(options)
            if (data.message === 'success') {
                toast.success('Comment added successfully')
                formik.resetForm() // Reset form values
                if (onCommentAdded) {
                    onCommentAdded() // Refresh comments
                }
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add comment')
            toast.error(err.response?.data?.message || 'Failed to add comment')
        } finally {
            setLoading(false)
        }
    }

    // Initialize Formik for form state management and validation
    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    })

    // Auto-focus textarea when component mounts
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [])

    return (
        <>
            <div className='add-comment-section mt-4 pt-4 border-t border-gray-200'>
                <div className='flex items-start gap-3'>
                    <div className="avatar w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user?.firstName?.charAt(0) || 'U'}
                    </div>

                    <form onSubmit={formik.handleSubmit} className='grow'>
                        <div className='relative'>
                            <FormField
                                ref={textareaRef}
                                elementType="textarea"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                name='content'
                                id='content'
                                onBlur={formik.handleBlur}
                                error={formik.errors.content}
                                touched={formik.touched.content}
                                placeholder="Write a comment..."
                                className={`w-full p-3 border-2 -mt-7 rounded-xl outline-none resize-none bg-gray-50 ${formik.errors.content && formik.touched.content ? 'border-red-500' : 'border-gray-300'} focus:border-blue-400`}
                                rows={1}
                            />
                        </div>

                        {/* Display API errors */}
                        {error && (
                            <div className='text-red-500 text-sm mt-2 flex items-center gap-1'>
                                {error}
                            </div>
                        )}

                        <div className='flex justify-end mt-2'>
                            <button
                                type='submit'
                                disabled={loading || !formik.values.content.trim()}
                                className='px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition'
                            >
                                {loading ? 'Posting...' : 'Comment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
