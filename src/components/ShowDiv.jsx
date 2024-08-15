import React, { useEffect,useState,useContext } from 'react'
import '../css/Popup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../App';

export const ShowDiv = ({show,RegisterDetails,setMoveTopics,setUserDetails}) => {

  const [username,setUsername] = useState(RegisterDetails.username);
  const [password,setPassword] = useState(RegisterDetails.password);
  const [phoneNumber,setPhoneNumber] = useState(RegisterDetails.phoneNumber);
  const [email,setEmail] = useState(RegisterDetails.email);
  const [college,setCollege] = useState(RegisterDetails.college);
  const [passedOutYear,setPassedOutYear] = useState(RegisterDetails.passedOutYear);
  const [mark,setMark] = useState(0);
  const [questionsAttend,setQuestionsAttend] = useState([]);
  const [topicsFinised,settopicsFinised] = useState([]);
  const [topics_completed,setTopics_completed] = useState(0);
  const [topics_incompleted,setTopics_incompleted] = useState(0);
  const [process,setProcess] = useState(0);

  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [disableTimer,setDisableTimer] = useState(false);
  const [loading,setLoading] = useState(false);
  const [creating,setCreating] = useState(false);
  const [user_otp,setInputOtp] = useState();
  const [validOtp,setValidOtp] = useState(false);
  const [validStatus,setValidStatus] = useState(false);
  const navigate = useNavigate();
  const {backendUrl} = useContext(cartContext);

  useEffect(() => {
    if (timeLeft === 0) {
      setDisableTimer(true);
      return;
    }
  const timerId = setInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);

  return () => clearInterval(timerId);
  }, [timeLeft, show]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  const handleSubmitBtn = async () => {
    setCreating(true);
      axios.post(`${backendUrl}register`,{user_otp,email,username,password,phoneNumber,college,passedOutYear,mark,questionsAttend,topicsFinised,topics_completed,topics_incompleted,process})
        .then(result => {
          console.log(result.data);
          if(!result.data){
            setValidStatus(true);
          }else{
            console.log(result);
          window.localStorage.setItem("isLoggedIn",true);
          window.localStorage.setItem("isLoggedDetails",JSON.stringify(result.data));
          navigate("/Home");
          }
          
        })
        .catch(err => console.log(err))
  }

  const handleResendBtn = async () => {
    setLoading(true);
      try {
        console.log(email);
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
        setLoading(false);
        setTimeLeft(300);
        setDisableTimer(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
  };

  return (
    <div className='popup'>
      <div className="popup-inner">
        <div className="inner-div">
        <h3>OTP Verification</h3>
        <input type="text" onChange={(e) => setInputOtp(e.target.value)} className='popup-input'/>
          <p>OTP was send to Your Email</p>
        {validStatus && (validOtp ? <p>OTP is Valid</p> : <p>OTP is Invalid</p>)}
        </div>
        <div className="btns">
            <button className='submit-btn' onClick={handleSubmitBtn}>Submit</button>
            {loading && <div className='loading-wait'>Resending OTP..</div>}
            {!loading && ((disableTimer) ? <button onClick={handleResendBtn} className='resend-btn'>Resend OTP</button> :<div className='time-left'>Time Left: {formatTime(timeLeft)}</div>)}
        </div>
      </div>
    </div>
  )
}
