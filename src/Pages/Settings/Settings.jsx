import React, { useState, useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { AuthContext } from '../../Context/Auth.context'
import { toast } from 'react-toastify'
import FormField from '../../Components/ui/FormField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLock, faUser, faEye, faEyeSlash, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

export default function Settings() {
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('account')
  const [accountSettings, setAccountSettings] = useState({
    firstName: 'User',
    lastName: 'Name',
    email: 'user@example.com',
    phone: '+1 234 567 8900'
  })
  
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    messageNotifications: true
  })
  
  const [privacySettings, setPrivacySettings] = useState({
    isPublic: true,
    allowMessages: true,
    showEmail: false,
    allowComments: true
  })

  const handleAccountChange = (field, value) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handlePrivacyChange = (field) => {
    setPrivacySettings(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSaveAccount = () => {
    toast.success('Account settings saved successfully!')
  }

  const handleChangePassword = () => {
    if (!passwordSettings.currentPassword || !passwordSettings.newPassword || !passwordSettings.confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    toast.success('Password changed successfully!')
    setPasswordSettings({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('token')
      setToken(null)
      toast.error('Account deleted successfully')
      navigate('/login')
    }
  }

  return (
    <div className='settings-page bg-gray-100 min-h-screen pb-8'>
      <Navbar />
      
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='mb-8'>
          <button 
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4'
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>
          <h1 className='text-4xl font-bold text-gray-800'>Settings</h1>
          <p className='text-gray-600 mt-2'>Manage your account preferences and privacy settings</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar Navigation */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-sm p-4 sticky top-24'>
              <nav className='space-y-2'>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeTab === 'account'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Account</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeTab === 'security'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FontAwesomeIcon icon={faLock} />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeTab === 'notifications'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FontAwesomeIcon icon={faBell} />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    activeTab === 'privacy'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span>Privacy</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className='bg-white rounded-xl shadow-sm p-6 space-y-6'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6'>Account Information</h2>
                  
                  <div className='space-y-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-gray-700 font-semibold mb-2'>First Name</label>
                        <input
                          type='text'
                          value={accountSettings.firstName}
                          onChange={(e) => handleAccountChange('firstName', e.target.value)}
                          className='form-control'
                          placeholder='Enter your first name'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Last Name</label>
                        <input
                          type='text'
                          value={accountSettings.lastName}
                          onChange={(e) => handleAccountChange('lastName', e.target.value)}
                          className='form-control'
                          placeholder='Enter your last name'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>Email Address</label>
                      <input
                        type='email'
                        value={accountSettings.email}
                        onChange={(e) => handleAccountChange('email', e.target.value)}
                        className='form-control'
                        placeholder='Enter your email'
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>Phone Number</label>
                      <input
                        type='tel'
                        value={accountSettings.phone}
                        onChange={(e) => handleAccountChange('phone', e.target.value)}
                        className='form-control'
                        placeholder='Enter your phone number'
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveAccount}
                    className='btn mt-6 bg-blue-500 hover:bg-blue-600'
                  >
                    <FontAwesomeIcon icon={faSave} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className='bg-white rounded-xl shadow-sm p-6 space-y-6'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6'>Security Settings</h2>
                  
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Change Password</h3>
                      <div className='space-y-4'>
                        <div className='relative'>
                          <label className='block text-gray-700 font-semibold mb-2'>Current Password</label>
                          <div className='relative'>
                            <input
                              type={passwordSettings.showCurrentPassword ? 'text' : 'password'}
                              value={passwordSettings.currentPassword}
                              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                              className='form-control'
                              placeholder='Enter current password'
                            />
                            <button
                              type='button'
                              onClick={() => handlePasswordChange('showCurrentPassword', !passwordSettings.showCurrentPassword)}
                              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            >
                              <FontAwesomeIcon icon={passwordSettings.showCurrentPassword ? faEyeSlash : faEye} />
                            </button>
                          </div>
                        </div>

                        <div className='relative'>
                          <label className='block text-gray-700 font-semibold mb-2'>New Password</label>
                          <div className='relative'>
                            <input
                              type={passwordSettings.showNewPassword ? 'text' : 'password'}
                              value={passwordSettings.newPassword}
                              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                              className='form-control'
                              placeholder='Enter new password'
                            />
                            <button
                              type='button'
                              onClick={() => handlePasswordChange('showNewPassword', !passwordSettings.showNewPassword)}
                              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            >
                              <FontAwesomeIcon icon={passwordSettings.showNewPassword ? faEyeSlash : faEye} />
                            </button>
                          </div>
                        </div>

                        <div className='relative'>
                          <label className='block text-gray-700 font-semibold mb-2'>Confirm Password</label>
                          <div className='relative'>
                            <input
                              type={passwordSettings.showConfirmPassword ? 'text' : 'password'}
                              value={passwordSettings.confirmPassword}
                              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                              className='form-control'
                              placeholder='Confirm new password'
                            />
                            <button
                              type='button'
                              onClick={() => handlePasswordChange('showConfirmPassword', !passwordSettings.showConfirmPassword)}
                              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            >
                              <FontAwesomeIcon icon={passwordSettings.showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleChangePassword}
                        className='btn mt-6 bg-blue-500 hover:bg-blue-600'
                      >
                        <FontAwesomeIcon icon={faSave} />
                        <span>Update Password</span>
                      </button>
                    </div>

                    <hr className='border-gray-200' />

                    <div>
                      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Danger Zone</h3>
                      <div className='space-y-3'>
                        <button
                          onClick={handleLogout}
                          className='btn w-full bg-orange-500 hover:bg-orange-600'
                        >
                          <span>Logout All Sessions</span>
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className='btn w-full bg-red-500 hover:bg-red-600'
                        >
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className='bg-white rounded-xl shadow-sm p-6 space-y-6'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6'>Notification Preferences</h2>
                  
                  <div className='space-y-4'>
                    {/* Email Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Email Notifications</h3>
                        <p className='text-sm text-gray-600'>Receive notifications via email</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.emailNotifications}
                          onChange={() => handleNotificationChange('emailNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Push Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Push Notifications</h3>
                        <p className='text-sm text-gray-600'>Receive push notifications on your device</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.pushNotifications}
                          onChange={() => handleNotificationChange('pushNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.pushNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Comment Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Comment Notifications</h3>
                        <p className='text-sm text-gray-600'>Get notified when someone comments on your posts</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.commentNotifications}
                          onChange={() => handleNotificationChange('commentNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.commentNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Like Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Like Notifications</h3>
                        <p className='text-sm text-gray-600'>Get notified when someone likes your posts</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.likeNotifications}
                          onChange={() => handleNotificationChange('likeNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.likeNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Follow Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Follow Notifications</h3>
                        <p className='text-sm text-gray-600'>Get notified when someone follows you</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.followNotifications}
                          onChange={() => handleNotificationChange('followNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.followNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Message Notifications */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Message Notifications</h3>
                        <p className='text-sm text-gray-600'>Get notified when you receive new messages</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.messageNotifications}
                          onChange={() => handleNotificationChange('messageNotifications')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${notificationSettings.messageNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => toast.success('Notification preferences saved!')}
                    className='btn mt-6 bg-blue-500 hover:bg-blue-600'
                  >
                    <FontAwesomeIcon icon={faSave} />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className='bg-white rounded-xl shadow-sm p-6 space-y-6'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6'>Privacy Settings</h2>
                  
                  <div className='space-y-4'>
                    {/* Public Profile */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Public Profile</h3>
                        <p className='text-sm text-gray-600'>Make your profile visible to everyone</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={privacySettings.isPublic}
                          onChange={() => handlePrivacyChange('isPublic')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${privacySettings.isPublic ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Allow Messages */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Allow Messages</h3>
                        <p className='text-sm text-gray-600'>Allow anyone to send you direct messages</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={privacySettings.allowMessages}
                          onChange={() => handlePrivacyChange('allowMessages')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${privacySettings.allowMessages ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Show Email */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Show Email Address</h3>
                        <p className='text-sm text-gray-600'>Display your email on your public profile</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={privacySettings.showEmail}
                          onChange={() => handlePrivacyChange('showEmail')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${privacySettings.showEmail ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>

                    {/* Allow Comments */}
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Allow Comments</h3>
                        <p className='text-sm text-gray-600'>Allow comments on your posts</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={privacySettings.allowComments}
                          onChange={() => handlePrivacyChange('allowComments')}
                          className='sr-only peer'
                        />
                        <div className={`w-11 h-6 rounded-full peer ${privacySettings.allowComments ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => toast.success('Privacy settings saved!')}
                    className='btn mt-6 bg-blue-500 hover:bg-blue-600'
                  >
                    <FontAwesomeIcon icon={faSave} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
