import React, { useEffect, useState } from 'react'
import '../css/SQLTopics.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import lockIcon from '../assets/lock-solid.svg'
 
export const SQLTopics = ({markScore}) => {
    
    const loginIs = JSON.parse(window.localStorage.getItem("isLoggedDetails"));
    const [emailId,setEmailId] = useState(loginIs[1]);
    const navigate = useNavigate();
 
    // useEffect(() => {
    // },[navigate])
    // console.log(loggedIn);

   const handleLogoutBtn = () => {
        window.localStorage.clear();
        navigate('/Login');
    }

  return(
    <div className='sqltopics-main-container'>
        {/* <div className='usernameSQL1'><h3>Your Score : {markScore}</h3></div>
        <button className='logout-btn' onClick={handleLogoutBtn}>Logout</button>
        <div className='usernameSQL'><img src={profileimg} alt="" /><h3>{profileName}</h3></div> */}
        <div className="sqltopics-container">
            <h1>SQL</h1>
            <div className="sqltopics-box">
                <div className="sqltopics-left">
                    {/* <div className="Hline">
                        <div className="round round-1"></div>
                        <div className="round round-2"></div>
                        <div className="round round-3"></div>
                        <div className="round round-4"></div>
                        <div className="round round-4"></div>
                        <div className="round round-5"></div>
                        <div className="round round-6"></div>
                        <div className="round round-7"></div>
                        <div className="round round-8"></div>
                        <div className="round round-9"></div>
                        <div className="round round-10"></div>
                        <div className="round round-11"></div>
                        <div className="round round-12"></div>
                        <div className="round round-13"></div>
                        <div className="round round-14"></div>
                    </div> */}
                </div>
                <div className="sqltopics-right">
                    <ul>
                        <li>
                            <div className="heading">Basics</div>
                            <div className="sublist"><Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${0}&var2=${0}&var3=${"Basics"}&var4=${"Select, Alias, Distinct, Order by, Limit, Offset"}&emailId=${emailId}` }}>Select, Alias, Distinct, Order by, Limit, Offset</Link></div>
                            <div className="desc">Structured query language (SQL) is a programming language 
                            for storing and processing information in a relational database. A relational database 
                            stores information in tabular form, with rows and columns representing 
                            different data attributes and the various relationships between the data values.</div>
                        </li>
                        <li>
                            <div className="heading heading-2">Filtering Data</div>
                            <div className="sublist">{!(markScore.topics_completed >= 1) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${0}&var3=${"Filtering Data"}&var4=${"SQL WHERE"}&emailId=${emailId}&emailId=${emailId}` }}>SQL WHERE</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${1}&var3=${"Filtering Data"}&var4=${"SQL Comparison Operators"}&emailId=${emailId}&emailId=${emailId}` }}>SQL Comparison Operators</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 3) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${2}&var3=${"Filtering Data"}&var4=${"SQL AND"}&emailId=${emailId}` }}>SQL AND</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 4) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${3}&var3=${"Filtering Data"}&var4=${"SQL OR"}&emailId=${emailId}` }}>SQL OR</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 5) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${4}&var3=${"Filtering Data"}&var4=${"SQL BETWEEN"}&emailId=${emailId}` }}>SQL BETWEEN</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 6) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${5}&var3=${"Filtering Data"}&var4=${"SQL IN"}&emailId=${emailId}` }}>SQL IN</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 7) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${6}&var3=${"Filtering Data"}&var4=${"SQL LIKE"}&emailId=${emailId}` }}>SQL LIKE</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 8) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${7}&var3=${"Filtering Data"}&var4=${"SQL NOT"}&emailId=${emailId}` }}>SQL NOT</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 9) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${1}&var2=${8}&var3=${"Filtering Data"}&var4=${"SQL IS NULL"}&emailId=${emailId}` }}>SQL IS NULL</Link></div>
                            <div className="desc">SQL filters are text strings that you 
                            use to specify a subset of the data items in an internal or SQL database data type.
                             For SQL database and internal data types, the filter is an SQL WHERE clause that provides a set of comparisons
                             that must be true in order for a data item to be returned.</div>
                        </li>
                        <li>
                            <div className="heading heading-3">Wildcards</div>
                            <div className="sublist">{!(markScore.topics_completed >= 10) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${2}&var2=${0}&var3=${"Wildcards"}&var4=${"Wildcards"}&emailId=${emailId}` }}>Wildcards</Link></div>
                            <div className="desc">A wildcard character is used to substitute one or more characters in a string. 
                            Wildcard characters are used with the LIKE operator. 
                            The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.</div>
                        </li>
                        <li>
                            <div className="heading heading-4">Aggregation Functions</div>
                            <div className="sublist">{!(markScore.topics_completed >= 11) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${3}&var2=${0}&var3=${"Aggregation Functions"}&var4=${"Aggregation Functions"}&emailId=${emailId}` }}>Aggregation Functions</Link></div>
                            <div className="desc">An aggregate function performs a calculation on a set of values, 
                            and returns a single value. Except for COUNT(*) , aggregate functions ignore null values.
                             Aggregate functions are often used with the GROUP BY clause of the SELECT statement. 
                             All aggregate functions are deterministic.
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-5">String Manipulation</div>
                            <div className="sublist">{!(markScore.topics_completed >= 12) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${4}&var2=${0}&var3=${"String Manipulation"}&var4=${"Concat"}&emailId=${emailId}` }}>Concat</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 13) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${4}&var2=${1}&var3=${"String Manipulation"}&var4=${"Upper"}&emailId=${emailId}` }}>Upper</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 14) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${4}&var2=${2}&var3=${"String Manipulation"}&var4=${"Lower"}&emailId=${emailId}` }}>Lower</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 15) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${4}&var2=${3}&var3=${"String Manipulation"}&var4=${"Substr"}&emailId=${emailId}` }}>Substr</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 16) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${4}&var2=${4}&var3=${"String Manipulation"}&var4=${"Instr"}&emailId=${emailId}` }}>Instr</Link></div>
                            <div className="desc">String Functions in SQL are built-in functions that
                             allow users to manipulate character data in various ways. These functions can perform tasks such as formatting text, 
                            extracting substrings, and searching for specific patterns within a string.
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-6">Date Functions</div>
                            <div className="sublist">{!(markScore.topics_completed >= 17) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${5}&var2=${0}&var3=${"Date Functions"}&var4=${"Date, Day, month, year, quarter, week, dayname, current_date, datediff, date_add, date_sub"}&emailId=${emailId}` }}>Date, Day, month, year, quarter,<br /> week, dayname, current_date,<br /> datediff, date_add, date_sub</Link></div>
                            <div className="desc">Date functions are functions that help to format 
                            dates and carry out date-related calculations on your data. 
                            They are usually only effective on data types that are in date format on SQL.
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-7">Group by and Having Clause</div>
                            <div className="sublist">{!(markScore.topics_completed >= 18) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${6}&var2=${0}&var3=${"Group by and Having Clause"}&var4=${"Group by and Having Clause"}&emailId=${emailId}` }}>Group by and Having Clause</Link></div>
                            <div className="desc">The GROUP BY clause combines similar rows, 
                            producing a single result row for each group of rows that have the same values, 
                            for each column listed in the Projection clause. 
                            The HAVING clause sets conditions on those groups after you form them.
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-8">Joins</div>
                            <div className="sublist">{!(markScore.topics_completed >= 19) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${7}&var2=${0}&var3=${"Joins"}&var4=${"Joins"}&emailId=${emailId}` }}>Joins</Link></div>
                            <div className="desc">JOIN is an SQL clause used to query and access data from multiple tables, 
                            based on logical relationships between those tables. In other words,
                             JOINS indicate how SQL Server should use data from one table to select the rows from another table.</div>
                        </li>
                        <li>
                            <div className="heading heading-9">Set Operations</div>
                            <div className="sublist">{!(markScore.topics_completed >= 20) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${8}&var2=${0}&var3=${"Set Operations"}&var4=${"SQL UNION"}&emailId=${emailId}` }}>SQL UNION</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 21) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${8}&var2=${1}&var3=${"Set Operations"}&var4=${"SQL UNION ALL"}&emailId=${emailId}` }}>SQL UNION ALL</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 22) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${8}&var2=${2}&var3=${"Set Operations"}&var4=${"SQL INTERSECT"}&emailId=${emailId}` }}>SQL INTERSECT</Link></div>
                            <div className="desc">Set operations in SQL is a type of operations which allow the results 
                            of multiple queries to be combined into a single result set. Set operators in SQL include
                             UNION , INTERSECT , and EXCEPT , which mathematically correspond to the concepts of
                              union, intersection and set difference.</div>
                        </li>
                        <li>
                            <div className="heading heading-10">Case Statements</div>
                            <div className="sublist">{!(markScore.topics_completed >= 23) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${9}&var2=${0}&var3=${"Case Statements"}&var4=${"Case Statements"}&emailId=${emailId}` }}>Case Statements</Link></div>
                            <div className="desc">The SQL CASE statement
                            The CASE statement is SQL's way of handling if/then logic. The CASE statement is followed by at 
                            least one pair of WHEN and THEN statements—SQL's equivalent of IF/THEN in Excel. 
                            Because of this pairing, you might be tempted to call this SQL CASE WHEN , but CASE is the accepted term.
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-11">Sub Queries and Correlated Sub Querie</div>
                            <div className="sublist">{!(markScore.topics_completed >= 24) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${10}&var2=${0}&var3=${"Sub Queries and Correlated Sub Queries"}&var4=${"Sub Queries and Correlated Sub Queries"}&emailId=${emailId}` }}>Sub Queries and Correlated Sub Queries</Link></div>
                            <div className="desc">In a SQL database query, a correlated subquery 
                            (also known as a synchronized subquery) is a subquery (a query nested inside another query) that uses 
                            values from the outer query. 
                            Because the subquery may be evaluated once for each row processed by the outer query, it can be slow.</div>
                        </li>
                        <li>
                            <div className="heading heading-12">Conditional Filtering</div>
                            <div className="sublist">{!(markScore.topics_completed >= 25) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${11}&var2=${0}&var3=${"Conditional Filtering"}&var4=${"SQL EXISTS"}&emailId=${emailId}` }}>SQL EXISTS</Link></div>
                            <div className="sublist">{!(markScore.topics_completed >= 26) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${11}&var2=${1}&var3=${"Conditional Filtering"}&var4=${"SQL NOT EXISTS"}&emailId=${emailId}` }}>SQL NOT EXISTS</Link></div>
                            <div className="desc">In a SQL database query, a correlated subquery 
                            (also known as a synchronized subquery) is a subquery (a query nested inside another query) that uses 
                            values from the outer query. 
                            Because the subquery may be evaluated once for each row processed by the outer query, it can be slow.</div>
                        </li>
                        <li>
                            <div className="heading heading-13">Windows Functions</div>
                            <div className="sublist">{!(markScore.topics_completed >= 27) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${12}&var2=${0}&var3=${"Windows Functions"}&var4=${"Windows Functions"}&emailId=${emailId}` }}>Windows Functions</Link></div>
                            <div className="desc">In SQL, a window function or analytic function is a function which uses
                             values from one or multiple rows to return a value for each row. (This contrasts with an aggregate 
                             function, which returns a single value for multiple rows.)
                            </div>
                        </li>
                        <li>
                            <div className="heading heading-14">Views and CTE</div>
                            <div className="sublist">{!(markScore.topics_completed >= 28) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}{!(markScore.topics_completed >= 2) && <div className='lock-tp'><img src={lockIcon} alt="" /></div>}<Link className='link-color' to={{pathname: "/SqlTest",search: `?var1=${13}&var2=${0}&var3=${"Views and CTE"}&var4=${"Views and Common Table Expressions(CTE)"}&emailId=${emailId}` }}>Views and Common Table Expressions(CTE)</Link></div>
                            <div className="desc">CTEs are temporary result sets used within the scope of a single
                             query and are often employed for complex or recursive queries. Views, on the other hand,
                              are permanent objects in the database used to simplify and abstract complex queries for 
                              better maintainability and reusability.</div>
                        </li>
                    </ul>
                </div>
             <div className="clear-both"></div>
            </div>
        </div>
    </div>
  )
}
