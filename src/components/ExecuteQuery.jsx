import React from 'react'
import { useState } from 'react';

export const ExecuteQuery = ({backendUrl,data1,var1,var2,count,inputData,setInputData,showOutput,setShowOutput,displayAnsNotification,setDisplayAnsNotification,queryExecuted,setQueryExecuted,questionExist,setquestionExist,emailId,markScore,setMarkScore,errorQuery,setErrorQuery }) => {
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
                            const response = await axios.get(`${backendUrl}question-status`, {
                                params: {
                                    gmail:emailId,
                                    questions:data1[var1][var2][count].Question
                                }
                            });
                
                            if (response.data) {
                                const questionIn = response.data;
                                if(questionIn){
                                    try {
                                        const response = await axios.get(`${backendUrl}questions-add`, {
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
                const response = await axios.get(`${backendUrl}execute-query`, {
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
                    <button className='execute-query' type='submit'onClick={handleSubmit}>Execute Query</button>
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
