import { faArrowRight, faCalendarAlt, faEnvelope, faLock, faSpinner, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FormField from '../ui/FormField'
import Divider from '../ui/Divider'
import SocialBtns from '../ui/SocialBtns'
import axios from 'axios'

export default function SignupForm() {

  const [accountIsExist, setAccountIsExist]=useState(null)

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  const signupSchema = yup.object().shape({
    name: yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, "Name cannot exceed 20 characters"),
    email: yup.string()
      .email('email is invalid')
      .required('Email is required'),
    password: yup.string()
      .matches(passwordRegex, 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.')
      .required('Password is required'),
    rePassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please re-enter your password'),
    dateOfBirth: yup.string()
      .required('Date of birth is required'),
    gender: yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female'], 'Invalid gender selection'),
  })
  async function handleSubmit(values) {
    try {
      //* Simple method to send post request using axios

      // const {data} = await axios.post('https://linked-posts.routemisr.com/users/signup', values);
      // console.log(data)

      //* Another method to send post request using axios

      const options = {
        url: 'https://linked-posts.routemisr.com/users/signup',
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        data: values
      }
      const {data} = await axios.request(options);
      console.log(data)

      //* Fetch method to send post request

      //  const response = await fetch('https://linked-posts.routemisr.com/users/signup', {
      //       method: 'POST',
      //       body: JSON.stringify(values),
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     })
      //     const data = await response.json()

      if (data.message === 'success') {
        toast.success('Account created successfully')
        // navigate to login page
        setTimeout(() => {
          navigate('/login')
        }, 5000);
      }
    } catch (error) {
      console.log(error)
      setAccountIsExist(true)
      // toast.error('Failed to create account. Please try again.')
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    validationSchema: signupSchema,
    onSubmit: handleSubmit,
  })


  const options = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]



  return (
    <>
      <div className="signup-form min-h-screen flex justify-center items-center bg-gray-100 py-12 rounded-lg shadow-md w-full mx-auto">
        <form action="" onSubmit={formik.handleSubmit} className='w-full bg-white max-w-lg mx-auto p-10 rounded-2xl shadow-md space-y-5'>
          <header className='space-y-2 text-center'>
            <h2 className='text-3xl font-bold'>Create account</h2>
            <p>Aleardy have an account? <Link className='text-blue-600' to={`/login`}>Sign in</Link></p>
          </header>
          <SocialBtns />
          <Divider text="or continue with email" />
          <div className="form-controls space-y-4">
            <FormField
              elementType="input"
              id="fullName"
              label="Full Name"
              inputType="text"
              name="name"
              placeholder="Enter your full name"
              startIcon={faUser}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormField
              elementType="input"
              id="email"
              label="Email Address"
              inputType="text"
              name="email"
              placeholder="name@examble.com"
              startIcon={faEnvelope}
              value={formik.values.email}
              onChange={(e)=>{
                formik.handleChange(e)
                setAccountIsExist(null)
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              isExistError={accountIsExist}
            />
            <FormField
              elementType="input"
              id="password"
              label="Password"
              inputType="password"
              name="password"
              placeholder="Enter a strong password"
              startIcon={faLock}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
            <FormField
              elementType="input"
              id="repassword"
              label="Re-enter Password"
              inputType="password"
              name="rePassword"
              placeholder="Confirm your password"
              startIcon={faLock}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.rePassword}
              touched={formik.touched.rePassword}
            />
            <div className="flexible-grid grid grid-cols-2 gap-4">
              <FormField
                elementType="input"
                id="dateOfBirth"
                label="Date of Birth"
                inputType="date"
                name="dateOfBirth"
                startIcon={faCalendarAlt}
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.dateOfBirth}
                touched={formik.touched.dateOfBirth}
              />
              <FormField
                elementType="select"
                id="gender"
                label="Gender"
                name="gender"
                startIcon={faVenusMars}
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.gender}
                touched={formik.touched.gender}
                options={options}
              />
            </div>
          </div>
          <button type="submit"
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            className='disabled:cursor-not-allowed disabled:bg-linear-to-r disabled:from-gray-500 disabled:to-gray-300 btn w-full mt-4 p-y4 bg-linear-to-r from-blue-600 to-blue-400 border-none font-bold'>
            {formik.isSubmitting ? (
              <>
                <span>Creating Your Account</span>
                <FontAwesomeIcon icon={faSpinner} spin className=' text-white' />
              </>
            ) : <span>Create Account</span>}
            <FontAwesomeIcon icon={faArrowRight} className=' text-white' />
          </button>
        </form>
      </div>
    </>
  )
}
