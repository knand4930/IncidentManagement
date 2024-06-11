import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from './interceptor/axiosInstance';

const CATEGORY_CHOICES = [
  { value: 'Enterprise', label: 'Enterprise' },
  { value: 'Government', label: 'Government' }
];

const PRIORITY_CHOICES = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
];

const STATUS_CHOICES = [
  { value: 'Open', label: 'Open' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Closed', label: 'Closed' }
];


function Create() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [value , setValue] = useState({
    category:"",
    details:"",
    priority:"",
    status:"",
  })

  console.log(value, "printed !!")
  const navigate = useNavigate()
  // setValue(response.data)
  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axiosInstance.post(`${API_URL}account/incidents/`, value)
      .then(response => {
        navigate('/')

      })
      .catch(error => {console.log(error);});
  }

  return (
    <>
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="">Add a Incident</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-2">
          <label htmlFor="category">Category:</label>
                <select
                    name='category'
                    className='form-control'
                    onChange={e => setValue({ ...value, category: e.target.value })}
                >
                    <option value="" disabled selected>Enter Your Category</option>
                    {CATEGORY_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
          </div>

          <div className="mb-2">
          <label htmlFor="details">Details:</label>
          <input type="text" name='details' className='form-control' placeholder='Enter Your Details' onChange={e => setValue({...value, details:e.target.value})}/>
          </div>

          <div className="mb-2">
          <label htmlFor="priority">Priority:</label>
                <select
                    name='priority'
                    className='form-control'
                    onChange={e => setValue({ ...value, priority: e.target.value })}
                >
                    <option value="" disabled selected>Enter Your Priority</option>
                    {PRIORITY_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
          </div>
         

          <div className="mb-2">
          <label htmlFor="status">Status:</label>
                <select
                    name='status'
                    className='form-control'
                    onChange={e => setValue({ ...value, status: e.target.value })}
                >
                    <option value="" disabled selected>Enter Your Status</option>
                    {STATUS_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
          </div>
         

        <button className='btn btn-success'>Submit</button>
        <Link to="/" className="btn btn-primary ms-3">Back</Link>

        </form>
      </div>
    </div>
    
    </>
  )
}

export default Create