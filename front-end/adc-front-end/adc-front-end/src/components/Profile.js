import React, { useEffect, useState } from 'react';

import axios from 'axios';
import '../css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faEnvelope,faPhoneVolume,faCertificate,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Assurez-vous d'importer Link et useNavigate
function Profile() {
    const [userData, setUserData] = useState(null);
   
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
        // Fonction pour la déconnexion
        const logOut = () => {
            
            localStorage.removeItem('token'); // Supprimer le token du localStorage
            navigate('/login'); // Rediriger vers la page de login
        };
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
              // Si aucun token, rediriger vers la page de login
              if (!token) {
                navigate('/');
                return;
            }
            try {
               
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/');
            }
        };
     

        fetchUserData();
    }, [navigate]);

     // Si userData est null après la tentative de récupération, on redirige vers la page de login
     if (!userData) {
        return null; // Retourner null pour éviter d'afficher le profil tant que la redirection n'a pas eu lieu
    }
   

    return (
        //dash profile//
        <div className="container profile-container col ">
            <div className='row'>
          
            {/* Intégration du tableau de bord */}
            <div className=" col-lg-12 col-sm-12">
             <h1 className='profile-position mt-5'>Profile</h1>
      <button className=" btn btn-danger nav-item nav-log mb-5 ms-2">
                <Link to={"/"} className="nav-link logout-link" onClick={logOut}>LogOut</Link>
             </button> 

      {/* Lien vers le tableau de bord */}
      <Link to="/dashboard">
        <button className="btn btn-primary btn-dashboard mt-2 mb-5 ps-0 ms-3">Dashboard</button>
      </Link>
    </div>
   
               <div className='col-lg-6 col-sm-12'>
                    {userData.profileImage && ( // Afficher l'image de profil si elle existe
                        <img
                            src={`http://localhost:5000/uploads/${userData.profileImage}`} // Ajuste le chemin selon ton serveur
                            alt="Profile"
                            className="img-profile ms-2"
                       />
                    )} </div>
                    
                     <div className="col-lg-6 col-sm-12 text-introduction bg-teritory">
                        
                      <form className='form-profile me-5'>
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
