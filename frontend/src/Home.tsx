import axios from 'axios';
import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './interceptor/axiosInstance';

type DataItem = {
  id: "";
  incident_id:"";
  category: "";
  reporter: "";
  details: "";
  reported_date: "";
  update_date: "";
  priority: "";
  status: "";
};


function Home() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [data, setData] = useState<DataItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get(`${API_URL}account/incidents/list/`)
      .then(response => setData(response.data))
      .catch(error => { console.log(error); });
  }, []);

  const handleDelete = (id: string) => {
    const confirm = window.confirm("Would You Like To Delete !!");
    if (confirm) {
      axiosInstance
        .delete(`${API_URL}account/incidents/` + id + `/destroy/`)
        .then((response) => {
          // navigate('/');
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <h1 className="">List Of Incident</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <div className="mr-2">
              <Link to="/create/" className="btn btn-success" style={{ marginRight: '10px' }}>Add +</Link>
            </div>
            <div className="mr-2">
              <Link to="/login/" className="btn btn-info" style={{ marginRight: '10px' }} >Login</Link>
            </div>
            <div>
              <Link to="/register/" className="btn btn-primary">Register</Link>
            </div>
          </div>
          <table className='table table-stripend'>
            <thead>
              <tr>
                <th>Incident Id</th>
                <th>Category</th>
                <th>Reporter</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Create at</th>
                <th>Update at</th>
                <th>Action</th>
              </tr>
            </thead>
            {
              data.map((d, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{d.incident_id}</td>
                      <td>{d.category}</td>
                      <td>{d.reporter}</td>
                      <td>{d.priority}</td> 
                      <td>{d.status}</td>
                      <td>{new Date(d.reported_date).toLocaleString()}</td>
                      <td>{new Date(d.update_date).toLocaleString()}</td>
                      <td>
                        <Link to={`/read/${d.id}/`} className='btn btn-sm btn-info ms-2'>Read</Link>
                        <Link to={`/update/${d.id}/`} className='btn btn-sm btn-primary ms-2'>Edit</Link>
                        <button onClick={(e) => handleDelete(d.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>

                      </td>
                    </tr>
                  </>
                )

              })
            }
          </table>
        </div>
      </div>
    </>
  )


}


export default Home

