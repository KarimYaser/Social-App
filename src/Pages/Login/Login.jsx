import React from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'
import AuthHero from '../../Components/AuthHero/AuthHero'
export default function Login() {
  return (
    <>
      <div className="grid lg:grid-cols-2">
        {/* Left signup hero */}
        <AuthHero title={{normal:"Welcome Back ", highlight:"to socialHub App"}} 
        description={"Sign in to connect with amazing people"} />
        {/* Right signup hero */}
        <LoginForm />
      </div>
    </>
  )
}
