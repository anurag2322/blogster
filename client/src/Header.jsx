import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setuserinfo,userinfo}=useContext(UserContext)
    useEffect(()=>{
      fetch('http://localhost:4000/profile',{
        credentials: 'include'
      }).then(response =>{
        response.json().then(userinfo => {
          setuserinfo(userinfo)
        })
      })
    },[])
    function logout(){
      fetch('http://localhost:4000/logout',{
        method: 'POST',
        credentials: 'include'
      })
      setuserinfo(null)
    }
    const username=userinfo?.username
    return (
      <header>
        <Link to="/" className='logo'>Blogster</Link>
        <nav>
          {username && (
            <>
            <Link to={'/create'}>Create New Article</Link>
            <a onClick={logout} >Logout</a>
            </>
          )}
          {!username && (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    )
}