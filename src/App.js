// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
const [employees, setEmployees] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemPerPage = 10;

useEffect(() => {
  const fetchData = async() => {
    try{
      const response = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      setEmployees(response.data);
    }
    catch(err){
      alert("Failed to fetch data");
    }
  }
  fetchData();
}, []);



const indexOfLastEmployee = currentPage * itemPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - itemPerPage;
const currentEmployees = employees.slice(
  indexOfFirstEmployee,
  indexOfLastEmployee
);

const nextPage = () => {
  if(currentPage < Math.ceil(employees.length/ itemPerPage)){
    setCurrentPage(currentPage + 1);
  }
};

const previousPage = () => {
  if(currentPage > 1){
    setCurrentPage(currentPage - 1);
  }
}

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key = {index}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
            </tr>
          ))

          }
        </tbody>
      </table>
          <div className='buttoncontainer'>
            <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>
            <button>{currentPage}</button>
            <button
              onClick = {nextPage}
              disabled = {currentPage === Math.ceil(employees.length / itemPerPage)}
            >
              Next
            </button>
          </div>
    </div>
  );
}

export default App;
