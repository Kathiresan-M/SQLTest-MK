import React, { useEffect,useState } from 'react'
import '../css/Popup.css'
import {Link} from 'react-router-dom'

export const ShowDiv = ({show,RegisterDetails,setMoveTopics,setUserDetails}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [disableTimer,setDisableTimer] = useState(false);
  const [loading,setLoading] = useState(false);
  const [creating,setCreating] = useState(false);
  const [inputOtp,setInputOtp] = useState();
  const [validOtp,setValidOtp] = useState(false);
  const [validStatus,setValidStatus] = useState(false);

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
      try {
        const response = await fetch(`http://localhost:5000/register-user?user_otp=${Number(inputOtp)}&username=${RegisterDetails[0]}&password=${RegisterDetails[1]}&mobile=${RegisterDetails[2]}&gmail=${RegisterDetails[3]}&college=${RegisterDetails[4]}&yearOfGraduation=${RegisterDetails[5]}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const uservalid = await response.json();
        if(!uservalid){
          setValidOtp(false);
        }else{
          setUserDetails(uservalid);
          window.localStorage.setItem("isLoggedIn",true);
          window.localStorage.setItem("isLoggedDetails",JSON.stringify(uservalid));
          console.log(uservalid);
          setMoveTopics(true);
        }
        setCreating(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
  }

  const handleResendBtn = async () => {
    setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/check-user?gmail=${RegisterDetails[3]}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setLoading(false);
        setTimeLeft(300);
        setDisableTimer(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
  };

  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <div className="popup-inner">
        <div className="inner-div">
        <h3>OTP Verification</h3>
        <input type="text" onChange={(e) => setInputOtp(e.target.value)} className='popup-input'/>
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
