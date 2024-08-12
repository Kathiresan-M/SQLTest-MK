import React, { useState, useEffect, useContext } from 'react'
import '../css/Profile.css'
import axios from 'axios';
import { cartContext } from '../App';

export const Profile = () => {
  const [markScore,setMarkScore] = useState({});
  const [name,setName] = useState(null);
  
  const [phoneNumber,setPhoneNumber] = useState(null);
  const [college,setCollege] = useState(null);
  const [passedOutYear,setPassedOutYear] = useState(null);
  const loginIs = JSON.parse(window.localStorage.getItem("isLoggedDetails"));
  const [email,setEmail] = useState(loginIs.email);
  const [emailId,setEmailId] = useState(loginIs.email);
  const {backendUrl} = useContext(cartContext);
  const [editTrue,setEditTrue] = useState(false);


  useEffect(() => {
    if (emailId) {
      axios.post(`${backendUrl}update-curdetails`, { emailId })
        .then(result => {
          setName(result.data.username || '');
          setEmail(result.data.email || '');
          setPhoneNumber(result.data.phoneNumber || '');
          setCollege(result.data.college || '');
          setPassedOutYear(result.data.passedOutYear || '');
        })
        .catch(error => {
          console.error("Error fetching profile details:", error);
        });
    }
  }, [backendUrl, emailId]);

  const handleProfileSubmit = () => {
    axios.post(`${backendUrl}update-profile`,{email,name,phoneNumber,college,passedOutYear}).then(result => {
      console.log(result.data);
    });
  }

  return (
    <div className="profile-main">
      <h3 className='pro-details'>Profile Details</h3>
      <div className="container">
        <div className="row margin-bt10">
          <div className="col-sm details">
              <h3>Name</h3>
              <input type="text" value={name || ''} onChange={(e) => setName(e.target.value)}  className={(!editTrue)?'disabled':''}/>
          </div>
          <div className="col-sm details">
            <h3>Email ID</h3>
            <input type="text" value={email || ''} onChange={(e) => setEmail(e.target.value)} className={(!editTrue)?'disabled':''}/>
          </div>
        </div>
        <div className="row margin-bt10">
          <div className="col-sm details">
            <h3>Phone Number</h3>
            <input type="text" value={phoneNumber || ''} onChange={(e) => setPhoneNumber(e.target.value)} className={(!editTrue)?'disabled':''}/>
          </div>
          <div className="col-sm details">
            <h3>College</h3>
            <input type="text" value={college || ''} onChange={(e) => setCollege(e.target.value)} className={(!editTrue)?'disabled':''}/>
          </div>
        </div>
        <div className="row margin-bt10">
          <div className="col-sm details">
            <h3>Passed Out Year</h3>
            <input type="text" value={passedOutYear || ''} onChange={(e) => setPassedOutYear(e.target.value)} className={(!editTrue)?'disabled':''}/>
          </div>
          <div className="col-sm details">
            {!editTrue && <button className='edit-btn' onClick={() => setEditTrue(true)}>Edit</button>}
            {editTrue && <button className='edit-btn' onClick={() => {
              setEditTrue(false);
              handleProfileSubmit();
              }}>Submit</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
