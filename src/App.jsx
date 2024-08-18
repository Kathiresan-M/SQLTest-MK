
import { SQLTopics } from './components/SQLTopics'
import './App.css'
import {SqlTest} from './components/SqlTest.jsx';
import Data from './JSONFiles/SQLQuestion.json';
import { createContext, useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { Home } from './components/Home.jsx';
import { ShowDiv } from './components/ShowDiv.jsx';
import  FullscreenComponent from './components/FullscreenComponent.jsx';


export const cartContext = createContext();

const backendUrl = "http://localhost:5000/";
// const backendUrl = "https://sqlserver-mk.onrender.com/";

function App() { 
  const isLogin = window.localStorage.getItem("isLoggedIn");
  // conlose.log(isLogin);
  return (
    <cartContext.Provider value={{Data,backendUrl}}>
    <BrowserRouter>
          <div className="main-container">
            <Routes>
              <Route path='/' element={isLogin ? <Home /> : <Login />} />
              {/* <Route path='/' element={isLogin ? <SQLTopics /> : <Login />} /> */}
              <Route path='/Login' element={<Login />} />
              <Route path='/Home' element={<Home/>} />
              <Route path='/Register' element={isLogin ? <Home /> : <Register />} />
              <Route path='/Registeration' element={<Register />} />
              <Route path='/SQLTopics' element={<SQLTopics />} />
              <Route path='/SqlTest' element={<SqlTest />} />
              <Route path='/ShowDiv' element={<ShowDiv />} />
              <Route path='/FullscreenComponent' element={<FullscreenComponent />} />
            </Routes>
          </div>
    </BrowserRouter>
  </cartContext.Provider>
  )
}

export default App
