import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from './interceptor/axiosInstance';

type DataItem = {
  id: string;
  incident_id: string;
  category: string;
  reporter: string;
  details: string;
  reported_date: string;
  update_date: string;
  priority: string;
  status: string;
};

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

function Update() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState<DataItem>({
    id: '',
    incident_id: '',
    category: '',
    reporter: '',
    details: '',
    reported_date: '',
    update_date: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    axiosInstance.get(`${API_URL}account/incidents/${id}/update/`)
      .then(response => {
        setValue(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id, API_URL]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    axiosInstance.put(`${API_URL}account/incidents/${id}/update/`, value)
      .then(response => {
        console.log(response);
        navigate(`/read/${id}/`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="">Update Incident</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              className="form-control"
              value={value.category}
              onChange={e => setValue({ ...value, category: e.target.value })}
            >
              <option value="" disabled>Select Category</option>
              {CATEGORY_CHOICES.map(choice => (
                <option key={choice.value} value={choice.value}>{choice.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="priority">Priority:</label>
            <select
              name="priority"
              className="form-control"
              value={value.priority}
              onChange={e => setValue({ ...value, priority: e.target.value })}
            >
              <option value="" disabled>Select Priority</option>
              {PRIORITY_CHOICES.map(choice => (
                <option key={choice.value} value={choice.value}>{choice.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              className="form-control"
              value={value.status}
              onChange={e => setValue({ ...value, status: e.target.value })}
            >
              <option value="" disabled>Select Status</option>
              {STATUS_CHOICES.map(choice => (
                <option key={choice.value} value={choice.value}>{choice.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="details">Details:</label>
            <input
              type="text"
              name="details"
              className="form-control"
              value={value.details}
              placeholder="Enter Your Details"
              onChange={e => setValue({ ...value, details: e.target.value })}
            />
          </div>

          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-primary ms-3">Home</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
