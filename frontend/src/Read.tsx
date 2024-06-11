import React, { useEffect, useState } from 'react'
import { Link, useParams, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

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

function Read() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [data, setData] = useState<DataItem>(); 
  const {id} = useParams();

  useEffect(() => {
    axios.get(`${API_URL}account/incidents/`+id+`/retrieve/`)
      .then(response => setData(response.data))
      .catch(error => {console.log(error);});
  }, [id]);

  return (
    <>
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3 className="">Details Of Incident</h3>
        <div className="mb-2">
        <strong>Id : {data?.id}</strong>
        </div>

        <div className="mb-2">
        <strong>Incident Id : {data?.incident_id}</strong>
        </div>

        <div className="mb-2">
        <strong>Category :  {data?.category}</strong>
        </div>


        <div className="mb-2">
        <strong>Reporter :  {data?.reporter}</strong>
        </div>



        <div className="mb-2">
        <strong>Status :  {data?.status}</strong>
        </div>

        
        <div className="mb-2">
        <strong>Details :  {data?.details}</strong>
        </div>


        <div className="mb-2">
        <strong>Reported Date : {data?.reported_date ? new Date(data.reported_date).toLocaleString() : 'N/A'}</strong>
        </div>

        <div className="mb-2">
        <strong>Last Update :  {data?.update_date ? new Date(data.update_date).toLocaleString() : 'N/A'}</strong>
        </div>
        <Link to={`/update/${id}/`} className="btn btn-success ms-3">Edit</Link>
        <Link to="/" className="btn btn-primary ms-3">Home</Link>
      </div>
    </div>

    
    </>
  )
}

export default Read