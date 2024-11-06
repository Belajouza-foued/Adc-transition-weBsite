import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import registerImage from "../images/logo-adc.png";
import "../css/style.css";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [education, setEducation] = useState('');
    const [adress, setAdress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('lastname', lastname);
        formData.append('number', number);
        formData.append('email', email);
        formData.append('status', status);
        formData.append('education', education);
        formData.append('adress', adress);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })  
            console.log(response.data);

            // Navigate to profile page on success
            navigate('/login');
            
            // Optionally reload the page
            window.location.reload();
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <>
<div className='container '>
<div className='row'>
    <div className='col-lg-3 col-sm-12 reg-col' >
<img src={registerImage} className='imgReg' alt=''></img>
    </div>
    <div className='col-lg-9 col-sm-12 text-center bg-primary-subtle ps-5' >
        <form onSubmit={handleSubmit} className='row position-form  ps-5'>
        <h2 className='line me-5 pt-5'>Register</h2>
            <div className='col-lg-3 col-sm-12 first'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='form-control mt-3'
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className='form-control mt-3'
                />
                  <input
                    type="lastname"
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                     className='form-control mt-3'
                />
                </div>
               
               
            
    
    <div className='col-lg-3 col-sm-12 ms-2'>
    
    <input
                    type="number"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className='form-control mt-3'
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     className='form-control mt-3'
                />
                <input
                    type="status"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                     className='form-control mt-3'
                />
               
    </div>
    <div className='col-lg-3 col-sm-12 third ms-2'>
    <input
                    type="text"
                    placeholder="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className='form-control mt-3'
                />
                  <input
                    type="text"
                    placeholder="Adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    className='form-control mt-3'
                />
 <input
        type="file"
 onChange={(e) => setProfileImage(e.target.files[0])}
 className='form-control mt-3'
     />
    </div>
   
    <button type="submit" className='mt-3 btn btn-primary push'>Register</button>
    </form>
    </div>
</div>

  </div>
       

        
        </>
       



    );
}


export default Register;