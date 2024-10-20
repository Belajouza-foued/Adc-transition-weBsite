import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import loginImage from '../images/logo-adc.png'
import '../css/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();  // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            console.log(response.data);
 // Navigate to profile page on success
 navigate('/profile');
            
 // Optionally reload the page
 window.location.reload();

            localStorage.setItem('token', response.data.token); // Save JWT to local storage
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className='container-fluid login-container'>
<div className='row'>
    
    <div className='col-lg-4 col-sm-12 log-col' >
<img src={loginImage} className='imglog' alt=''></img>
    </div>
        <div className='col-lg-8 col-sm-12 login-position bg-primary-subtle'>
            
            <form  className="form-login"onSubmit={handleLogin}>
            <div>
    <FontAwesomeIcon icon={faUser} className='image-user'/>
    </div>
            <h2 className='titi'>Login:</h2>
            <div className='position-user'>
                {username === '' && (
                    <FontAwesomeIcon icon={faUser} className='icon-user'/>
                )}
           
                <input
                    type="text"

                   value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='form-control '
                />
                 </div>
         <div className="position-relative">
      {password === '' && (
        <FontAwesomeIcon
          icon={faLock}
          className="position-absolute"
         
        />
      )}
                <input
                    type="password"
                     value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control mt-5'                    
                />
                </div>
                <div className="form-check check-login">
      <label className="form-check-label" for="invalidCheck">
      <Link to={'/register'} className='link-register'> Create New Account</Link>
      </label>
      <div className="invalid-feedback">
       
      </div>
     
    <Link to={'/forgot-password'} className='link-register'>Forgot password</Link>
    </div>
                <button type="submit" className='btn btn-primary form-control log-button mb-5'>Login</button>
            </form>
        </div>
        </div>
        </div>
    );
}

export default Login;
