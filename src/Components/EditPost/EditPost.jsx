import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios'
import FormField from '../ui/FormField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function EditPost({ postData, onUpdateSuccess, onCancel }) {
    const { token } = useContext(AuthContext)
    const [imagePreview, setImagePreview] = useState(postData?.image || null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [removeImage, setRemoveImage] = useState(false)


    // Validation schema matching PostUpload
    const validationSchema = yup.object({
        body: yup.string()
            .required('Post content is required')
            .min(3, 'Post content must be at least 3 characters')
            .max(500, 'Post content must be at most 500 characters'),
        image: yup.mixed()
            .nullable()
            .test('fileSize', 'Image size must be less than 5MB', (file) => {
                if (!file) return true;
                return file.size <= 5 * 1024 * 1024;
            })
            .test('fileFormat', 'Image must be in JPG, JPEG, PNG, or GIF format', (file) => {
                if (!file) return true;
                const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                return allowedFormats.includes(file.type);
            })
    })

    // Handle form submission
    async function handleSubmit(values) {
        setError('')
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('body', values.body)

            // Handle image update logic
            if (values.image) {
                // New image selected
                formData.append('image', values.image)
            } else if (removeImage && postData?.image) {
                // User wants to remove existing image
                // Note: API behavior may vary - some APIs accept empty string or require specific handling
                formData.append('image', '')
            }

            const options = {
                url: `https://linked-posts.routemisr.com/posts/${postData.id || postData._id}`,
                method: 'PUT',
                headers: {
                    token: token,
                },
                data: formData,
            }

            const { data } = await axios.request(options)
            if (data.message === 'success') {
                toast.success('Post updated successfully')
                if (onUpdateSuccess) {
                    onUpdateSuccess() // Refresh posts and exit edit mode
                }
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post')
            toast.error(err.response?.data?.message || 'Failed to update post')
        } finally {
            setLoading(false)
        }
    }

    // Initialize Formik with existing post data
    const formik = useFormik({
        initialValues: {
            body: postData?.body || '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    })

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue('image', file)
            setRemoveImage(false)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle image removal
    const handleRemoveImage = () => {
        formik.setFieldValue('image', null)
        setImagePreview(null)
        setRemoveImage(true)
    }

    return (
        <>
            <div className='edit-post-section bg-gray-50 rounded-xl p-6 my-4 border-2 border-blue-300'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>Edit Post</h3>
                    <button
                        onClick={onCancel}
                        className='text-gray-500 hover:text-gray-700 transition'
                    >
                        <FontAwesomeIcon icon={faXmark} className='text-xl' />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <FormField
                        elementType="textarea"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        name='body'
                        id='body'
                        onBlur={formik.handleBlur}
                        error={formik.errors.body}
                        touched={formik.touched.body}
                        placeholder="What's on your mind?"
                        className={`w-full p-4 border-2 rounded-2xl outline-none resize-none bg-white ${formik.errors.body && formik.touched.body ? 'border-red-500' : 'border-gray-300'} focus:border-blue-400`}
                        rows={4}
                    />

                    {/* Display API errors */}
                    {error && (
                        <div className='text-red-500 text-sm mt-2 flex items-center gap-1'>
                            <span className='text-lg'>●</span>
                            {error}
                        </div>
                    )}

                    {/* Image preview with remove button */}
                    {imagePreview && (
                        <div className='mt-4 relative'>
                            <img src={imagePreview} alt='preview' className='w-full rounded-lg max-h-96 object-cover' />
                            <button
                                type='button'
                                onClick={handleRemoveImage}
                                className='cursor-pointer hover:bg-red-600 flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full p-2'
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    )}

                    <div className='flex items-center justify-between mt-6 flex-wrap max-w-full'>
                        <div className='flex gap-2'>
                            <label htmlFor='edit-image' className='cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-gray-200 shadow hover:bg-gray-100 rounded-md transition'>
                                <span className='text-lg'>📷</span>
                                <span className='text-sm font-medium'>Change Photo</span>
                                <FormField
                                    elementType='file'
                                    accept='image/*'
                                    id='edit-image'
                                    name='image'
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.image}
                                    touched={formik.touched.image}
                                    className='hidden'
                                />
                            </label>
                        </div>

                        <div className='flex gap-2'>
                            <button
                                type='button'
                                onClick={onCancel}
                                className='px-6 py-2 cursor-pointer bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={loading}
                                className='px-8 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-blue-300 transition'
                            >
                                {loading ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
