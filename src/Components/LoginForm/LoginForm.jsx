import { faArrowRight, faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, useFormik } from 'formik'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FormField from '../ui/FormField'
import Divider from '../ui/Divider'
import SocialBtns from '../ui/SocialBtns'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/Auth.context'

export default function LoginForm() {
    // Consume AuthContext to get setToken function
    const { token, setToken } = useContext(AuthContext);
    // console.log(token)

    const [wrongCredentials, setWrongCredentials] = useState(null) /* Wrong inputs */

    const navigate = useNavigate();

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const loginSchema = yup.object().shape({
        email: yup.string()
            .email('email is invalid')
            .required('Email is required'),
        password: yup.string()
            .matches(passwordRegex, 'Password is Inconrrect')
            .required('Password is required'),
    })
    async function handleSubmit(values) {
        try {

            const options = {
                url: 'https://linked-posts.routemisr.com/users/signin',
                method: 'POST',
                data: values
            }
            const { data } = await axios.request(options);
            console.log(data)

            if (data.message === 'success') {
                toast.success('Welcome Back!')
                localStorage.setItem('token', data.token); /* Store token in localStorage */
                setToken(data.token) /* User token */
                // navigate to login page
                setTimeout(() => {
                    navigate('/')
                }, 5000);
            }
        } catch (error) {
            // console.log(error)
            setWrongCredentials(error.response.data.error)
            // toast.error('Failed to create account. Please try again.')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    })


    return (
        <>
            <div className="signup-form min-h-screen flex justify-center items-center bg-gray-100 py-12 rounded-lg shadow-md w-full mx-auto">
                <form action="" onSubmit={formik.handleSubmit} className='w-full bg-white max-w-lg mx-auto p-10 rounded-2xl shadow-md space-y-5'>
                    <header className='space-y-2 text-center'>
                        <h2 className='text-3xl font-bold'>Login</h2>
                        <p>Don't have an account? <Link to="/signup" className='text-blue-600 font-semibold hover:underline'>Sign up</Link></p>
                    </header>
                    <SocialBtns />
                    <Divider text="or continue with email" />
                    <div className="form-controls space-y-4">
                        <FormField
                            elementType="input"
                            id="email"
                            label="Email Address"
                            inputType="text"
                            name="email"
                            placeholder="Enter your email address"
                            startIcon={faEnvelope}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                        // isExistError={accountIsExist}
                        />
                        <FormField
                            elementType="input"
                            id="password"
                            label="Password"
                            inputType="password"
                            name="password"
                            placeholder="Enter your password"
                            startIcon={faLock}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.password}
                            touched={formik.touched.password}
                        />
                        {wrongCredentials && <div className="bg-red-200 text-red-500 py-2 px-2 rounded-lg mt-12">{wrongCredentials}</div>}
                    </div>
                    <button type="submit"
                        disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                        className='disabled:cursor-not-allowed disabled:bg-linear-to-r disabled:from-gray-500 disabled:to-gray-300 btn w-full mt-4 p-y4 bg-linear-to-r from-blue-600 to-blue-400 border-none font-bold'>
                        {formik.isSubmitting ? (
                            <>
                                <span>Loging in ...</span>
                                <FontAwesomeIcon icon={faSpinner} spin className=' text-white' />
                            </>
                        ) : <span>Login</span>}
                        <FontAwesomeIcon icon={faArrowRight} className=' text-white' />
                    </button>
                </form>
            </div>
        </>
    )
}
