import React from 'react'
import { Link } from 'react-router'
import { faHouse, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-500 mb-2">404</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved. Let's get you back to exploring!
          </p>

          {/* Error Icon/Illustration */}
          <div className="mb-8 text-6xl text-gray-300">
            📍
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-300 shadow-md"
          >
            <FontAwesomeIcon icon={faHouse} />
            <span>Go Home</span>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Extra Help Text */}
        <p className="text-gray-500 text-sm mt-8">
          Need help? <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
