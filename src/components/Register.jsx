import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios';
import { cartContext } from '../App';



export const Register = () => {

  const [username,setUsername] = useState(null);
  const [password,setPassword] = useState(null);
  const [phoneNumber,setPhoneNumber] = useState(null);
  const [email,setEmail] = useState(null);
  const [college,setCollege] = useState(null);
  const [passedOutYear,setPassedOutYear] = useState(null);
  const [mark,setMark] = useState(0);
  const [questionsAttend,setQuestionsAttend] = useState([]);
  const [otp,setOtp] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails,setUserDetails] = useState();
  const [fillAllData,setFillAllData] = useState(false);
  const [loading,setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [moveTopics,setMoveTopics] = useState(false);
  const [userExists,setUserExists] = useState(false);
  const RegisterDetails = [username,password,phoneNumber,email,college,passedOutYear,questionsAttend];
  const navigate = useNavigate();
  const {backendUrl} = useContext(cartContext);

  const handleRegisterBtn = (e) => {
    e.preventDefault()
    setLoading(true);
    if(!username || !password || !phoneNumber || !email || !college || !passedOutYear) {
      setFillAllData(true);
      setLoading(false);
    }else{
      axios.post(`${backendUrl}register`,{email,username,password,phoneNumber,college,passedOutYear,mark})
        .then(result => {
          if(!result.data){
            setUserExists(true);
          }else{
            console.log(result);
          window.localStorage.setItem("isLoggedIn",true);
          window.localStorage.setItem("isLoggedDetails",JSON.stringify(result.data));
          navigate("/Home");
          }
          
        })
        .catch(err => console.log(err))
      setLoading(false)
    }
  };

  return (
    <>
    <div className="maincontainer">
      <div className="registerpage">
          <div className="logo">REGISTER</div>
          <div className="username">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="name" />
          </div>
          <div className="password">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="pass" />
          </div>
          <div className="username">
            <input type="text" placeholder="Phone Number"  onChange={(e) => setPhoneNumber(e.target.value)}className="name" />
          </div>
          <div className="username">
            <input type="text" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} className="name" />
          </div>
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
        {/* <ShowDiv show={showPopup} startTimer={startTimer} RegisterDetails={RegisterDetails} setMoveTopics={setMoveTopics} setUserDetails={setUserDetails}/>  */}
    </div>
  </>
  );
}
