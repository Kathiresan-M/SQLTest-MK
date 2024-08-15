import React, { useContext, useEffect, useState } from 'react'
import '../css/Home.css'
import profileicon from '../assets/profile.png'
import { SQLTopics } from './SQLTopics'
import { Dashboard } from './Dashboard'
import { Profile } from './Profile'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios'
import { cartContext } from '../App';

export const Home = () => {

    const [dashboardValid,setDashboardValid] = useState(true);
    const [sqlTopicsValid,setSqlTopicsValid] = useState(false);
    const [profileValid,setProfileValid] = useState(false);
    const loginIs = JSON.parse(window.localStorage.getItem("isLoggedDetails"));
    const [emailId,setEmailId] = useState(loginIs.email);
    const [profileName,setProfileName] = useState(loginIs.username);
    const [markScore,setMarkScore] = useState(Number(loginIs.mark));
    const navigate = useNavigate();
    const {backendUrl} = useContext(cartContext);
    const [validUser1,setValidUser1] = useState(null);

    const handleDashboardBtn = () => {
        setDashboardValid(true);
        setSqlTopicsValid(false);
        setProfileValid(false);
    }
    const handleSQLTopicsBtn = () => {
        setDashboardValid(false);
        setSqlTopicsValid(true);
        setProfileValid(false);
    }
    const handleProfileBtn = () => {
        setDashboardValid(false);
        setSqlTopicsValid(false);
        setProfileValid(true);
    }
    const HandleHomeLogoutBtn = () => {
        window.localStorage.clear();
        navigate('/Login');
    }
    useEffect(() => {
        axios.post(`${backendUrl}update-curdetails`,{emailId}).then(result => {
            setValidUser1(result.data);
            setMarkScore(result.data)
        });
    },[handleDashboardBtn])

  return (
    <div className='HomePage'>
        <div className="homeleft">
            <div className="homeSQL">SQL Test</div>
            <div className={dashboardValid ? "Dashboardbtn active-btn" : "Dashboardbtn"} onClick={handleDashboardBtn}>DashBoard</div>
            <div className={sqlTopicsValid ? "SQLTopicsBtn active-btn" : "SQLTopicsBtn"} onClick={handleSQLTopicsBtn}>SQL Topics</div>
            <div className={profileValid ? "ProfileBtn active-btn" : "ProfileBtn"} onClick={handleProfileBtn}>Profile</div>
            <button className='logout-home-btn' onClick={HandleHomeLogoutBtn}>Logout</button>
            <div className='align-end'>
                <div className="mb-profilehome"><img src={profileicon} alt="" /></div>
                <div className="mb-pronamehome">{profileName}</div>
            </div>
        </div>
        <div className="homeright">
            <div className="homerighttop">
                <div className="searchhome">
                    <input type="text" placeholder='dashboard'/>
                    <button className="srcBtn">Search</button>
                </div>
                <div className="profilehome"><img src={profileicon} alt="" /></div>
                <div className="pronamehome">{profileName}</div>
            </div>
            <div className="homerightcenter">
                {dashboardValid && <Dashboard markScore={markScore}/>}    
                {sqlTopicsValid && <SQLTopics/>}
                {profileValid && <Profile />}
            </div>
        </div>
    </div>
  )
}
