import React, { useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, {AxiosRequestConfig} from 'axios'
import { useJwt } from "react-jwt";
import { isConstructorDeclaration } from 'typescript';
import { isExpired, decodeToken } from "react-jwt";


function Login() {
  const [loading, setLoading] = useState(false)
  // const { saveAuth, setCurrentUser,currentUser } = useAuth()
// console.log(currentUser);

  const API_URL = process.env.REACT_APP_API_URL;
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  
  const [errors, setErrors] = useState<string[]>([]);

  const [token, setToken] = useState('');

  const navigate = useNavigate()
  


  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post(`${API_URL}auth/jwt/create/`, login)
      .then(response => {
        const accessToken = response.data.access;
        const accessRefresh = response.data.refresh;
        setToken(accessToken);

        localStorage.setItem('token',accessToken)
        const myDecodedToken:any = decodeToken(accessToken);
        const isMyTokenExpired = isExpired(accessRefresh);
        const currentUserId = myDecodedToken?.user_id

        const config = {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        };

        const userDetails = axios.get(`${API_URL}auth/users/${currentUserId}/`, config)


        navigate('/')

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.detail) {
          setErrors([error.response.data.detail]); // Ensure errors is an array
        } else {
          console.log(error);
        }
      });
  }

  console.log(token, "Token Has Been Printed")






  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1 className="">Login User</h1>


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
              <label htmlFor="email">Email:</label>
              <input type="email" name='email' className='form-control' placeholder='Enter Your Email' required onChange={e => setLogin({ ...login, email: e.target.value })} />
            </div>

            <div className="mb-2">
              <label htmlFor="password">Password:</label>
              <input type="password" name='password' className='form-control' placeholder='Enter Your Password' required onChange={e => setLogin({ ...login, password: e.target.value })} />
            </div>

            <button className='btn btn-success'>Login</button>
            <Link to="/register/" className="btn btn-primary ms-3">Regiter</Link>

          </form>
        </div>
      </div>


    </>
  )
}


export default Login


  // const commonHeaders = {
  //   headers: {
  //     Authorization: `JWT ${token}`,
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // };