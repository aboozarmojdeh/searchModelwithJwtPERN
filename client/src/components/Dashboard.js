import React, { Fragment,useState,useEffect } from "react";
import { toast } from "react-toastify";
const Dashboard = ({ setAuth }) => {
const [name,setName]=useState("");

const getName=async ()=>{
try {
  const response=await fetch('http://localhost:5000/dashboard/',{
    method:"GET",
    headers:{token:localStorage.token}
  });
  const parsRes=await response.json();
  console.log(parsRes);
  setName(parsRes.user_name)
} catch (err) {
  console.error(err.message)
}
} 

useEffect(()=>{
  getName();
},[]);

const logout=(e)=>{
  e.preventDefault();
  localStorage.removeItem('token');
  setAuth(false);
  toast.success('Logged out successfully!')
}
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {name}!</p>
     <button className='btn btn-danger' onClick={(e)=>logout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
