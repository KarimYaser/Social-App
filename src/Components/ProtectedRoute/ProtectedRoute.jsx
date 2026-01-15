import {  useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { Navigate } from "react-router";

// When user is not authenticated, prevent access to protected pages (home, profile, etc)

export default function ProtectedRoute({ children }) {
    // children => <Home />
  const {token} = useContext(AuthContext);
//   console.log(token);
  
    // TODO: verify token (backend)

if(token){
    return children;
}
else{
    return <Navigate to={`/login`} />;
}
}