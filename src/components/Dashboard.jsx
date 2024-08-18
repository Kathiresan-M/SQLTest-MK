import React from 'react'
import '../css/Dashboard.css'
import completedIcon from '../assets/completed.png'
import warningIcon from '../assets/warning.png'
import processIcon from '../assets/process.png'
import penIcon from '../assets/pen.png'

export const Dashboard = ({markScore}) => {
  return (
    <div className='dashboard-div'>
        <h1>Dashboard</h1>
        <div className="dashboard-content">
          <div className="dashboard1">
            <div className="topics-compt">
              <h3>Topics Completed<br/><span>{markScore.topics_completed}</span></h3>
              <img src={completedIcon} alt="" />
            </div>
            <div className="marks">
              <h3>Points<br/><span>{markScore.mark}</span></h3>
              <img src={penIcon} alt="" />
            </div>
          </div>
          <div className="dashboard2">
            <div className="topics-incompt">
              <h3>Topics Incompleted<br/><span>{markScore.topics_incompleted}</span></h3>
              <img src={warningIcon} alt="" />
            </div>
            <div className="process">
              <h3>Process<br/><span>{Math.round((markScore.topics_completed/markScore.topics_incompleted)*100)}% </span></h3>
              <img src={processIcon} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}
