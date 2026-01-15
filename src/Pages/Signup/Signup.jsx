import React from "react";
import SignupForm from "../../Components/SignupForm/SignupForm";
import AuthHero from "../../Components/AuthHero/AuthHero";

export default function Signup() {
  return (
    <>
    <div className="grid lg:grid-cols-2">
      {/* Left signup hero */}
      <AuthHero title={{normal:"Connect with ", highlight:"amazing people"}} 
      description={"Join millions of users sharing moments, ideas and building meaningful connections everyday"} />
      {/* Right signup hero */}
      <SignupForm />
    </div>
    </>
  );
}
