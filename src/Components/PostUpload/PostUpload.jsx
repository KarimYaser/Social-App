import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context'
import axios from 'axios'
import FormField from '../ui/FormField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PostUpload({ getAllPosts }) {
    const { token, user } = useContext(AuthContext)
    // State for image preview, API errors, and loading status
    const [imagePreview, setImagePreview] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    // Validation schema for form fields
    const validationSchema = yup.object({
        body: yup.string()
            .required('Post content is required')
            .min(3, 'Post content must be at least 3 characters')
            .max(500, 'Post content must be at most 500 characters'),
        image: yup.mixed()
            .nullable() // Image is optional
            .test('fileSize', 'Image size must be less than 5MB', (file) => {
                if (!file) return true; // Skip validation if no file selected
                return file.size <= 5 * 1024 * 1024;
            })
            .test('fileFormat', 'Image must be in JPG, JPEG, PNG, or GIF format', (file) => {
                if (!file) return true; // Skip validation if no file selected
                const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                return allowedFormats.includes(file.type);
            })
    })
    // Handle form submission
    async function handleSubmit(values) {
        setError('')
        setLoading(true)

        try {
            // Create FormData object to send multipart/form-data to backend
            const formData = new FormData()
            formData.append('body', values.body)
            if (values.image) {
                formData.append('image', values.image)
            }

            const options = {
                url: 'https://linked-posts.routemisr.com/posts',
                method: 'POST',
                headers: {
                    token: token,
                },
                data: formData,
            }

            const { data } = await axios.request(options)
            if (data.message === 'success') {
                console.log(data)
                toast.success('Post created successfully')
                formik.resetForm() // Reset form values
                setImagePreview(null) // Clear image preview
                getAllPosts() // Refresh the feed with the new post
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post')
            toast.error(err.response?.data?.message || 'Failed to create post')
        } finally {
            setLoading(false)
        }
    }
    // Initialize Formik for form state management and validation
    const formik = useFormik({
        initialValues: {
            body: '',
            image: null,
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    })


    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            formik.setFieldValue('image', file) // Update Formik state with selected file
            // Create preview using FileReader
            const reader = new FileReader()         /* Create a FileReader object to read the selected file */
            reader.onloadend = () => {              /* Set the image preview to the result of the FileReader */
                setImagePreview(reader.result)      /* Set the image preview to the result of the FileReader */
            }
            reader.readAsDataURL(file)              /* Read the selected file as a Data URL */
        }
    }



    return (
        <>
            <div className='container my-4 mx-auto max-w-2xl bg-white rounded-2xl shadow-lg p-6'>
                <header className='flex items-center gap-4 mb-6'>
                    <div className="avatar w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Create a Post</h2>
                        <p className='text-gray-500 text-sm'>Share your thoughts with the world</p>
                    </div>
                </header>

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
                        className={`w-full p-4 border-2 rounded-2xl outline-none resize-none bg-gray-50 ${formik.errors.body && formik.touched.body ? 'border-red-500' : 'border-gray-300'} focus:border-blue-400`}
                        rows={4}
                    />

                    {/* Display API errors */}
                    {error && (
                        <div className='text-red-500 text-sm mt-2 flex items-center gap-1'>
                            <span className='text-lg'>●</span>
                            {error}
                        </div>
                    )}

                    <div className='flex items-center justify-between mt-6'>
                        <div className='flex gap-2'>
                            <label htmlFor='image' className='cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-gray-200 shadow hover:bg-gray-100 rounded-md transition'>
                                <span className='text-lg'>📷</span>
                                <span className='text-sm font-medium'>Photo</span>
                                <FormField
                                    elementType='file'
                                    accept='image/*'
                                    id='image'
                                    name='image'
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.image}
                                    touched={formik.touched.image}
                                    className='hidden'
                                />
                            </label>
                        </div>

                        <button
                            onClick={formik.handleSubmit}
                            disabled={loading}
                            type='submit'
                            className='px-8 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-blue-300 transition'
                        >
                            {loading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>

                {/* Image preview with remove button */}
                {imagePreview && (
                    <div className='mt-4 relative'>
                        <img src={imagePreview} alt='preview' className='w-full rounded-lg max-h-full object-fit-cover ' />
                        <button                         /* x button */
                            onClick={() => {
                                formik.setFieldValue('image', null) // set Formik image value to null
                                setImagePreview(null) // Clear preview
                            }}
                            className='cursor-pointer hover:bg-red-600 flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full p-2'
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
