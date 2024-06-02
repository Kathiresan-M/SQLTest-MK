import React, { useContext, useState,useEffect } from 'react'
import { cartContext } from '../App';
import { useLocation } from 'react-router-dom';
import '../css/SqlTest.css'
import axios from 'axios';


const QuestionSet = ({ count, data1, var1, var2,showExpected,setShowExpected }) => {

    return (
        <div className="question-con">
            <h5>Question : {count + 1}</h5>
            <p>{data1[var1][var2][count].Question}</p>
            {
                data1[var1][var2][count].Table_Ques.map((data, index) => (
                    <div key={index}>
                        <h5>{data.Table_Title}</h5>
                        <table className='question-table'>
                            <thead>
                                <tr>
                                    <th>Column Name</th>
                                    <th>Data Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.Rows.map((data2, index) => (
                                        <tr key={index}>{
                                            data2.map((data3, index) => (
                                                <td key={index}>{data3}</td>
                                            ))
                                        }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ))
            }
            <button onClick={() => setShowExpected(!showExpected)} className='expected-btn'>{showExpected ? 'Hide' : 'Show'} Expected Output</button>
            {showExpected &&
                <div className="output-table-div">
                    <table className='expected-table'>
                    <tbody>
                        {
                            data1[var1][var2][count].Answer.map((data, index) => (
                                <tr key={index}>{
                                    data.map((data2, index) => (
                                        <td key={index}>{data2}</td>
                                    ))
                                }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            }
        </div>
    )
}

const ExecuteQuery = ({data1,var1,var2,count,inputData,setInputData,showOutput,setShowOutput,displayAnsNotification,setDisplayAnsNotification,queryExecuted,setQueryExecuted,questionExist,setquestionExist,emailId,markScore,setMarkScore,errorQuery,setErrorQuery }) => {
    
    const [users, setusers] = useState(null);
    
    const [ansCorrect, setAnsCorrect] = useState(false);
    
    const list2 = data1[var1][var2][count].Answer;

    // const [inputData, setInputData] = useState('');

    const handleChange = (e) => {
        setInputData(e.target.value);
        if(inputData){
            setQueryExecuted(false);
            setquestionExist(false);
            if(displayAnsNotification){
                HandleDisplay();
            }
        }
    };

    const HandleDisplay = async() => {
        
        if(queryExecuted){
            const flattenList = (list) => {
                if (!list) return [];
                return list.reduce((acc, val) => acc.concat(val || []), []);
            };
            const areListsEqual = (list1, list2) => {
                const flatList1 = flattenList(list1);
                const flatList2 = flattenList(list2);
                if (flatList1.length !== flatList2.length){ 
                    return false;
                }
                for (let i = 0; i < flatList1.length; i++) {                
                  if (flatList1[i] !== flatList2[i]){
                    console.log(false);
                    console.log(flatList1[i].toString());   
                    console.log(flatList2[i].toString());
                     return false;
                  }
                }
                return true;
            };
            setAnsCorrect(areListsEqual(users, list2));
            console.log(ansCorrect);
                    if(ansCorrect){
                        try {
                            const response = await axios.get('http://localhost:5000/question-status', {
                                params: {
                                    gmail:emailId,
                                    questions:data1[var1][var2][count].Question
                                }
                            });
                
                            if (response.data) {
                                const questionIn = response.data;
                                if(questionIn){
                                    try {
                                        const response = await axios.get('http://localhost:5000/questions-add', {
                                            params: {
                                                gmail:emailId,
                                                questions:data1[var1][var2][count].Question
                                            }
                                        });
                            
                                        if (response.data) {
                                            const QuestionAdd = response.data;
                                            if(QuestionAdd){
                                                console.log(QuestionAdd[0]);
                                                console.log(QuestionAdd[1]);
                                                setMarkScore(QuestionAdd[1]);
                                                setquestionExist(QuestionAdd[0]);
                                            }
                                        } else {
                                            console.error('Error:', response.statusText);
                                        }
                                    } catch (error) {
                                        console.error('Error:', error);
                                    }                
                                }else{
                                    setquestionExist(false);
                                }
            
                            } else {
                                console.error('Error:', response.statusText);
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
            setDisplayAnsNotification(!displayAnsNotification);
            
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(inputData !== ''){
            try {
                const response = await axios.get('http://localhost:5000/execute-query', {
                    params: {
                        sql: inputData
                    }
                });
    
                if (response.data[0]) {
                    const users1 = response.data[1];
                    console.log('Success:',users1);
                    setErrorQuery(false);
                    setusers(users1);
                    if(users1){
                        setQueryExecuted(true);
                    }
                    setShowOutput(!showOutput);

                } else {
                    // console.error('Error:', response.statusText);
                    console.log(response.data[1]);
                    setErrorQuery(true);
                    setusers(response.data[1]);
                    setShowOutput(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        // Send inputData to the backend
        
    };
    // const HandleExecuteBtn = () => {
    //   setShowOutput(!showOutput);
    // }

    return (
        <div className='output-query-box'>
            <h5 className='enter-query'>Enter your SQL Query Answer :</h5>
            <form onSubmit={handleSubmit}>
                <textarea name="" id="" className='query-input' value={inputData} onChange={handleChange}></textarea>
                <div className="leftright">
                    <button className='execute-query' type='submit'>Execute Query</button>
                </div>
            </form>
            <button className='submit-query' onClick={HandleDisplay}>Submit Query</button>
            <div className="clear-both"></div>
            {
                queryExecuted && <div className='exc-suc'>Query was executed successfully, click the submit Query</div>
            }
            {
                errorQuery && <div className='exc-suc'>{users}</div>
            }
            {(displayAnsNotification && queryExecuted) && <div className={ansCorrect ? 'correct-ans' : 'wrong-ans'}>
                Answer is {ansCorrect ? 'Correct' : 'Wrong'}
            </div>}
            { questionExist && <div className='correct-ans'>You Earned 5 Points!</div>}
            {(showOutput && queryExecuted) &&
                <div className="output-table-div">
                    <table className='output-table'>
                    <tbody>
                        {
                            users.map((users2, index) => (
                                <tr key={index}>{
                                    users2.map((users3, index) => (
                                        <td key={index}>{users3}</td>
                                    ))
                                }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            }
            

        </div>
    )
}


export const SqlTest = () => {
    const [showExpected, setShowExpected] = useState(false);
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const [inputData, setInputData] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const [displayAnsNotification,setDisplayAnsNotification] = useState(false);
    const [queryExecuted,setQueryExecuted] = useState(false);
    const [questionExist,setquestionExist] = useState(false);
    const [errorQuery,setErrorQuery] = useState(false);
    const data = () => useContext(cartContext);
    const data1 = data();

    const { search } = useLocation();

    // Parse the search query string to get the values
    const params = new URLSearchParams(search);
    const var1 = parseInt(params.get('var1'));
    const var2 = parseInt(params.get('var2'));
    const var3 = params.get('var3');
    const var4 = params.get('var4');
    const [markScore,setMarkScore ]= useState(Number(params.get('markScore')));
    const profileName = params.get('profileName');
    const emailId = params.get('emailId');

    const handleNextBtn = () => {
        if(inputData !== ''){
            setDisplayAnsNotification(false);
            setShowOutput(false);
            setQueryExecuted(false);
            setquestionExist(false);
            setInputData('');   
        }
        setquestionExist(false);
        setShowExpected(false);
        setErrorQuery(false);
        setIndexOfQuestion((indexOfQuestion < (data1[var1][var2].length - 1)) ? (indexOfQuestion + 1) : indexOfQuestion)
    }
    const handlePreviousBtn = () => {
        if(inputData !== ''){
            setDisplayAnsNotification(false);
            setShowOutput(false);
            setQueryExecuted(false);
            setquestionExist(false);
            setInputData('');   
        }
        setquestionExist(false);
        setShowExpected(false);
        setErrorQuery(false);
        setIndexOfQuestion((0 !== indexOfQuestion) ? (indexOfQuestion - 1) : indexOfQuestion);
    }

    return (
        <div className='sqltest-main-container'>
                <h1 className='mainTitle'>SQL Codebreaker Challenge</h1>
                <div className="userwel">
                    <h2>{var3}</h2>
                    <h3 className='subTitle'>{var4}</h3>
                    <h4 className='username-left'>{profileName}</h4>
                    <h4 className='username-right'>Your Score : {markScore}</h4>
                </div>
                <div className="sqltest-container">
                    <div className="sqltest-left">
                        <QuestionSet count={indexOfQuestion} data1={data1} var1={var1} var2={var2} showExpected={showExpected} setShowExpected={setShowExpected} />
                    </div>
                    <div className="sqltest-right">
                        <ExecuteQuery count={indexOfQuestion} data1={data1} var1={var1} var2={var2} inputData={inputData} setInputData={setInputData} showOutput={showOutput} setShowOutput={setShowOutput} displayAnsNotification={displayAnsNotification} setDisplayAnsNotification={setDisplayAnsNotification} queryExecuted={queryExecuted} setQueryExecuted={setQueryExecuted} questionExist={questionExist} setquestionExist={setquestionExist} emailId={emailId} markScore={markScore} setMarkScore={setMarkScore} errorQuery={errorQuery} setErrorQuery={setErrorQuery} />
                        <div className="leftright1">
                            <button className='previous-btn' onClick={handlePreviousBtn}>Previous</button>
                            <button className='next-btn' onClick={handleNextBtn}>Next</button>
                        </div>
                    </div>
                </div>
                <div className='clear-both'></div>
                <div className='empty'></div>
        </div>
    )
}
