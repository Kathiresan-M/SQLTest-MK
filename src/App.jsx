
import { SQLTopics } from './components/SQLTopics'
import './App.css'
import {SqlTest} from './components/SqlTest.jsx';
import Data from './JSONFiles/SQLQuestion.json';
import { createContext, useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';

export const cartContext = createContext();


function App() { 
  const isLogin = window.localStorage.getItem("isLoggedIn");
  // conlose.log(isLogin);
  return (
    <cartContext.Provider value={Data}>
    <BrowserRouter>
          <div className="main-container">
            <Routes>
              <Route path='/' element={isLogin ? <SQLTopics /> : <Login />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={isLogin ? <SQLTopics /> : <Register />} />
              <Route path='/SQLTopics' element={<SQLTopics />} />
              <Route path='/SqlTest' element={<SqlTest />} />
            </Routes>
          </div>
    </BrowserRouter>
  </cartContext.Provider>
  )
}

export default App
