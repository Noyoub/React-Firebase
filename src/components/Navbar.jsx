import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
 

export default function Navbar() {

  const {toggleModals} = useContext(UserContext);
  const {currentUser} = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = async () => {
    try{
      await signOut(auth);
      navigate('/');
    } catch(err){
      alert("For some reasons we can't disconnect, please check your internet connexion and retry.");
    }
  }

  if(currentUser){
    return(
      <nav className="navbar navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">AuthJs</Link>

        <div>
            <button onClick={logOut} className="btn btn-danger ms-2">Log out</button>
        </div>
      </nav>
    )
  }
  else{
    return (
      <nav className="navbar navbar-light bg-light px-4">
          <Link to="/" className="navbar-brand">AuthJs</Link>
  
          <div>
              <button onClick={() => toggleModals("signIn")}  className="btn btn-primary">Sign in</button>
              <button onClick={() => toggleModals("signUp")} className="btn btn-primary ms-2">Sign up</button>
          </div>
      </nav>
    )
  }
}
