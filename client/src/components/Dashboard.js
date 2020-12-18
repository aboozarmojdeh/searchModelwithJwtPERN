import React, { Fragment,useState,useEffect } from "react";
import { toast } from "react-toastify";
const Dashboard = ({ setAuth }) => {
const [name,setName]=useState("");
const [modelName,setModelName]=useState("");
const [superModels, setSuperModels] = useState([]);

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
};

const onSearchChange=(e)=>{
  setModelName(e.target.value)
  console.log(e.target.value)
};

const onSubmitForm=async (e)=>{
e.preventDefault();
try {
  const response = await fetch(`http://localhost:5000/models/?modelName=${modelName}`);
  const resResponse = await response.json();
  console.log("models:",resResponse);
  setSuperModels(resResponse);
} catch (err) {
  console.error(err.message);
}
};

const superModelMap=superModels.map((superModel)=>{
  return(
    <tr key={superModel.user_id}>
   
    <td>{superModel.first_name}</td>
    <td>{superModel.last_name}</td>
    
  </tr>
  )
});

  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="">Super Model Search</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        {/* <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li> */}
        {/* <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> */}
      </ul>
      <form class="d-flex">
      <p class="me-2">Welcome {name.toUpperCase()}!</p>
        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
        <button className='btn btn-danger' onClick={(e)=>logout(e)}>Logout</button>

      </form>
    </div>
  </div>
</nav>
      {/* <h1>Super Model Search</h1>
      <p>Welcome {name}!</p> */}
      <div className="container text-center">
        <h1 className="my-5">Party List</h1>
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
          required="required"
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter user..."
            value={modelName}
            onChange={onSearchChange}
          />
          <button className="btn btn-success">Search</button>
        </form>
        
        <table className="table table-dark table-hover my-5">
          <thead>
            <tr>
              
              <th scope="col">First</th>
              <th scope="col">Last</th>
              
            </tr>
          </thead>
          <tbody>
            {superModelMap}          
           
          </tbody>
        </table>
        {superModels.length===0 && <p>No results found</p>}
      </div>
      <hr />
     {/* <button className='btn btn-danger' onClick={(e)=>logout(e)}>Logout</button> */}
    </Fragment>
  );
};

export default Dashboard;
