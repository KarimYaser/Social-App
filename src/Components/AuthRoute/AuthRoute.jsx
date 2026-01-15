import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../Context/Auth.context";

// when user is authenticated, prevent access to login/signup pages

export default function AuthRoute({ children }) {
    const {token} = useContext(AuthContext);
//   console.log(token);
if(token){
    return <Navigate to={`/`} />;
}else{
    return children;
}
  
}
