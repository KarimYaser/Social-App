import React, { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios'
import FormField from '../ui/FormField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

export default function EditComment({ commentData, onUpdateSuccess, onCancel }) {
    const { token } = useContext(AuthContext)
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

    // Handle comment update
    async function handleSubmit(values) {
        setError('')
        setLoading(true)

        try {
            const options = {
                url: `https://linked-posts.routemisr.com/comments/${commentData._id}`,
                method: 'PUT',
                headers: {
                    token: token,
                },
                data: {
                    content: values.content
                },
            }

            const { data } = await axios.request(options)
            if (data.message === 'success') {
                toast.success('Comment updated successfully')
                if (onUpdateSuccess) {
                    onUpdateSuccess() // Refresh comments and exit edit mode
                }
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update comment')
            toast.error(err.response?.data?.message || 'Failed to update comment')
        } finally {
            setLoading(false)
        }
    }

    // Initialize Formik with existing comment data
    const formik = useFormik({
        initialValues: {
            content: commentData?.content || '',
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
            <div className='edit-comment-section bg-blue-50 rounded-xl p-4 border-2 border-blue-300'>
                <form onSubmit={formik.handleSubmit}>
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
                        placeholder="Edit your comment..."
                        className={`w-full p-3 border-2 rounded-xl outline-none resize-none bg-white ${formik.errors.content && formik.touched.content ? 'border-red-500' : 'border-gray-300'} focus:border-blue-400`}
                        rows={2}
                    />

                    {/* Display API errors */}
                    {error && (
                        <div className='text-red-500 text-sm mt-2'>
                            {error}
                        </div>
                    )}

                    <div className='flex justify-end gap-2 mt-2'>
                        <button
                            type='button'
                            onClick={onCancel}
                            className='px-4 py-1.5 cursor-pointer bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 transition'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={loading || !formik.values.content.trim()}
                            className='px-4 py-1.5 cursor-pointer bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition'
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
