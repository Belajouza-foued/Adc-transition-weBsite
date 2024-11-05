import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
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
        <div className='container mt-5   '>
            <div className='row'>

                <div className='col-lg-4 col-sm-12 log-col pb-5 ps-5 pe-0 pt-5' >
                    <img src={loginImage} className='imglog ps-5 pb-5 pt-5' alt=''>
                    </img>
                </div>
                <div className='col-lg-8 col-sm-12 login-position bg-primary-subtle'>
                   
                    <form className="form-login ps-5" onSubmit={handleLogin}>

                        <h2 className='text-center pt-3 pb-3 pe-5'>Login:</h2>
                        <div className='position-user col-lg-8 col-sm-12 ps-4'>
                          <input
                                type="text"
                                placeholder='username'

                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='form-control col-lg-8 col-sm-12 '
                            />
                        </div>
                        <div className="position-relative col-lg-8 col-sm-12 ps-4">
                        <input
                    type="password"
                    placeholder='password'
                     value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control mt-5'                    
                />
                        </div>
                        <div className="form-check col-lg-8 col-sm-12 pb-3 ms-4">
                           <Link to={'/register'} className='link-register ms-5'> Create New Account</Link>
                          <Link to={'/forgot-password'} className='link-register ms-5'>Forgot password</Link>
                        </div>
                        <div className='col-lg-8 col-sm-12 pb-5  button-login pe-5'>
                        <button type="submit" className='btn 
                        btn-primary
                         form-control log-button'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
