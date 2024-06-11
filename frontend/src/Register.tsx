import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [register , setRegister] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    password2:"",
    phone:"",
    address:"",
    pin_code:"",
    city:"",
    country:"",
    
    })

    console.log(register, "register Data Has been printed !!")
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate()
    // setValue(response.data)
    const handelSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post(`${API_URL}account/registrations/`, register)
        .then(response => {
            navigate('/login/')

        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.password) {
              setErrors(error.response.data.password);
            } else {
              console.log(error);
            }
          });
    }

  return (
    <>
    
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="">Register User</h1>
        
        {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
        )}

        <form onSubmit={handelSubmit}>
          <div className="mb-2">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name='first_name' className='form-control' placeholder='Enter Your First Name' required onChange={e => setRegister({...register, first_name:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="last_name">Last Name:</label> 
          <input type="text" name='last_name' className='form-control' placeholder='Enter Your Last Name' required onChange={e => setRegister({...register, last_name:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' className='form-control' placeholder='Enter Your Email' required onChange={e => setRegister({...register, email:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="password">Password:</label>
          <input type="password" name='password' className='form-control' placeholder='Enter Your Password' required onChange={e => setRegister({...register, password:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="Password">Confirm password:</label>
          <input type="password" name='password2' className='form-control' placeholder='Enter Your Password' required onChange={e => setRegister({...register, password2:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="phone">Phone:</label> 
          <input type="text" name='phone' className='form-control' placeholder='Enter Your Last Phone' required onChange={e => setRegister({...register, phone:e.target.value})}/>
          </div>


          <div className="mb-2">
          <label htmlFor="address">Address:</label>
          <input type="text" name='address' className='form-control' placeholder='Enter Your Address' required onChange={e => setRegister({...register, address:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="pin_code">Pin Code:</label> 
          <input type="text" name='pin_code' className='form-control' placeholder='Enter Your Pin Code' required onChange={e => setRegister({...register, pin_code:e.target.value})}/>
          </div>


          <div className="mb-2">
          <label htmlFor="city">City:</label> 
          <input type="text" name='city' className='form-control' placeholder='Enter Your City Name' required onChange={e => setRegister({...register, city:e.target.value})}/>
          </div>
         


          <div className="mb-2">
          <label htmlFor="country">Country:</label> 
          <input type="text" name='country' className='form-control' placeholder='Enter Your Country Name' required onChange={e => setRegister({...register, country:e.target.value})}/>
          </div>
         
        <button className='btn btn-success'>Register</button>
        <Link to="/login/" className="btn btn-primary ms-3">Login</Link>

        </form>

      </div>
    </div>
    
    
    </>
  )
}

export default Register