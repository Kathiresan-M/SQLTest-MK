import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios';
import { cartContext } from '../App';
import { ShowDiv } from './ShowDiv';



export const Register = () => {

  const [username,setUsername] = useState(null);
  const [password,setPassword] = useState(null);
  const [phoneNumber,setPhoneNumber] = useState(null);
  const [email,setEmail] = useState(null);
  const [college,setCollege] = useState(null);
  const [passedOutYear,setPassedOutYear] = useState(null);
  const [mark,setMark] = useState(0);
  const [questionsAttend,setQuestionsAttend] = useState([]);
  const [topicsFinised,settopicsFinised] = useState([]);
  const [topics_completed,setTopics_completed] = useState(0);
  const [topics_incompleted,setTopics_incompleted] = useState(29);
  const [process,setProcess] = useState(0);

  const [otp,setOtp] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails,setUserDetails] = useState();
  const [fillAllData,setFillAllData] = useState(false);
  const [loading,setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [moveTopics,setMoveTopics] = useState(false);
  const [userExists,setUserExists] = useState(false);
  const [validPassword,setValidPassword] = useState('true');
  const [emailError, setEmailError] = useState("true");
  const RegisterDetails = {email,username,password,phoneNumber,college,passedOutYear,mark,questionsAttend,topicsFinised,topics_completed,topics_incompleted,process};
  
  const navigate = useNavigate();
  const {backendUrl} = useContext(cartContext);

  const handleRegisterBtn = (e) => {
    e.preventDefault()
    setLoading(true);
    if(!username || !password || !phoneNumber || !email || !college || !passedOutYear) {
      setFillAllData(true);
      setLoading(false);
    }else{
      // axios.post(`${backendUrl}register`,{email,username,password,phoneNumber,college,passedOutYear,mark,questionsAttend,topicsFinised,topics_completed,topics_incompleted,process})
      //   .then(result => {
      //     if(!result.data){
      //       setUserExists(true);
      //     }else{
      //       console.log(result);
      //     window.localStorage.setItem("isLoggedIn",true);
      //     window.localStorage.setItem("isLoggedDetails",JSON.stringify(result.data));
      //     navigate("/Home");
      //     }
          
      //   })
      //   .catch(err => console.log(err))
      axios.post(`${backendUrl}user-already`,{email})
        .then(result => {
          if(!result.data){
            setUserExists(true);
          }else{
            setStartTimer(true);
            setShowPopup(true);
          }
          
        })
        .catch(err => console.log(err))
      setLoading(false)
    }
  };

  const validatePassword = (value) => {
    // Password validation criteria
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Check for minimum length
    if (value.length < minLength) {
      setValidPassword("Password must be at least 8 characters long");
      return;
    }

    // Check for uppercase letter
    if (!hasUpperCase) {
      setValidPassword("contain at least one uppercase letter.");
      return;
    }

    // Check for lowercase letter
    if (!hasLowerCase) {
      setValidPassword("contain at least one lowercase letter.");
      return;
    }

    // Check for number
    if (!hasNumber) {
      setValidPassword("contain at least one number.");
      return;
    }

    // Check for special character
    if (!hasSpecialChar) {
      setValidPassword("contain at least one special character.");
      return;
    }

    // If all checks pass
      setValidPassword('true'),
      setPassword(value)
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (validateEmail(newEmail)) {
      setEmailError("true"); // Clear error if email is valid
      setEmail(newEmail);
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };


  return (
    <>
    {
      showPopup? 
      <ShowDiv show={showPopup} startTimer={startTimer} RegisterDetails={RegisterDetails} setMoveTopics={setMoveTopics} setUserDetails={setUserDetails}/> 
      :
      <div className="maincontainer">
      <div className="registerpage">
          <div className="logo">REGISTER</div>
          <div className="username">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="name" />
          </div>
          <div className="password">
            <input type="password" placeholder="Password" onChange={(e) => validatePassword(e.target.value)} className="pass" />
          </div>
          {(validPassword === 'true')? <div></div>:<div className='strong-pass'>{validPassword}</div>}
          <div className="username">
            <input type="text" placeholder="Phone Number"  onChange={(e) => setPhoneNumber(e.target.value)}className="name" />
          </div>
          <div className="username">
            <input type="text" placeholder="Email ID" onChange={(e) => handleEmailChange(e)} className="name" />
          </div>
          {(emailError === 'true')? <div></div>:<div className='strong-pass'>{emailError}</div>}
          <div className="username">
            <input type="text" placeholder="College" onChange={(e) => setCollege(e.target.value)} className="name" />
          </div>
          <div className="username">
            <input type="text" placeholder="Passed Out Year" onChange={(e) => setPassedOutYear(e.target.value)} className="name" />
          </div>
          {fillAllData && <div className='fill-details'>Fill the All details!</div>}
          {userExists && <div className='fill-details'>User Already Exists!</div>}
          {loading && <div className='loading-wait'>Loading....</div>}
          {/* <div className="text">
            <p><input type="checkbox" className="checkbox" />Remember me</p>
            <a href="" className="a1">Forgot password</a>
          </div> */}
          
          {!loading && <div className="button"><button className='hoverbtn' onClick={handleRegisterBtn}>Register</button></div>}
          <div className="register" onClick={() => navigate("/Login")}>
            I have a account? Login
          </div>
      </div>
        
    </div> 
    }
  </>
  );
}
