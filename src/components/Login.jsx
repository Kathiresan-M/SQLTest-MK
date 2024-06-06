import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { SQLTopics } from './SQLTopics';

export const Login = () => {
  const [validUser,setValidUser] = useState(true);
  const [fillAllData,setFillAllData] = useState(false);
  const [loading,setLoading] = useState(false);
  const [password,setPassword] = useState(null);
  const [email,setEmail] = useState(null);
  const [moveTopics,setMoveTopics] = useState(false);

  const navigate = useNavigate();
  
  const handleLoginBtn = async(e) => {
    e.preventDefault();
    if(!email || !password) {
      setFillAllData(true);
    }else{
      try {
        setLoading(true);
        const response = await fetch(`https://sqlserver-mk.onrender.com/user-login?gmail=${email}&password=${password}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const uservalid = await response.json();
        if(!uservalid){
          setValidUser(false);
        }else{
          setValidUser(uservalid);
          window.localStorage.setItem("isLoggedIn",true);
          window.localStorage.setItem("isLoggedDetails",JSON.stringify(uservalid));
          navigate('/');
          console.log(uservalid);
          setMoveTopics(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }
  }

  return (
    <>
    {moveTopics ? <SQLTopics userDetails={validUser}/> :
    <div className="maincontainer">
      <form action="">
        <div className="loginpage">
          <div className="logo">LOGIN</div>
          <div className="username">
            <input type="text" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} className="name" />
          </div>
          <div className="password">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="pass" />
          </div>
          {fillAllData && <div className='fill-details'>Fill the All details!</div>}
          {loading && <div className='loading-wait'>Loading....</div>}
          {(!validUser && !loading) && <div className='loading-wait'>Incorrect Details</div>}
          {/* <div className="text">
            <p><input type="checkbox" className="checkbox" />Remember me</p>
            <a href="" className="a1">Forgot password</a>
          </div> */}
          <div className="button"><button className='hoverbtn' onClick={handleLoginBtn}>Login</button></div>
          {/* <Link to={{pathname:"/SQLTopics"} }>Login</Link> */}
          <div className="register" onClick={() => navigate("/Registeration")}>
            don't have account? register
            {/* <a href="register.html" className="a2"></a> */}
          </div>
        </div>
      </form>
    </div>
    }
    </>
  )
}
