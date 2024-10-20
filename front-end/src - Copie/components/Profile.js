import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faEnvelope,faPhoneVolume,faCertificate,faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container profile-container ">
            <div className='row'>
             
               <div className='col-6'>
                    {userData.profileImage && ( // Afficher l'image de profil si elle existe
                        <img
                            src={`http://localhost:5000/uploads/${userData.profileImage}`} // Ajuste le chemin selon ton serveur
                            alt="Profile"
                            className="img-profile"
                       />
                    )} </div>
                    
                     <div className="col-6 text-introduction bg-teritory">
                        
                      <form className='form-profile'>
                      <em className='description mb-2'> hello evry body you must believe<br>
                      </br> everything is possible dont give up</em>
              <h5 className="title-form mt-1">Username: {userData.username}</h5>
              <p className="text-form mt-2 last-profile mt-1">Lastname: {userData.lastname}</p>
                    <p className="text-form mt-1 ms-1">  <FontAwesomeIcon icon={faEnvelope} className="icon-profile" /> {userData.email}</p>
                  <p className="text-form mt-1 ms-1"><FontAwesomeIcon icon={faPhoneVolume} className="icon-profile"/> {userData.number}</p>
                    <p className="text-form mt-1 ms-1"><FontAwesomeIcon icon={faCertificate} className="icon-profile"/> {userData.status}</p>
                    <p className="text-form mt-1 ms-2"><FontAwesomeIcon icon={faLocationDot} className="icon-profile"/>{userData.adress}</p>
                    </form>
            </div>
            </div>
        </div>
    );
}

export default Profile;
