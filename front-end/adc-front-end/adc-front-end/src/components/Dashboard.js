import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/Dashboard.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Settings, User, LogOut, } from 'react-feather'
import {} from '@fortawesome/free-brands-svg-icons';
import { faChartPie,faUser,faClipboard,faUserTie,faBuildingColumns,faLocationDot,faCheck,faUserGraduate,faMagnifyingGlass,faBell } from '@fortawesome/free-solid-svg-icons';
import image10 from '../images/logo-adc.png'
import { Link} from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useState,navigate, useEffect } from 'react';
import ImageAvatar from '../images/avatar-illustrated-02.png'
import EngFlag from '../images/EngFlag.png.png';
import FrFlag from '../images/FrFlag.png.png';
import UsbFlag from '../images/UsbFlag.png.png';
import GerFlag from '../images/GerFlag.png.png';
import { getNotifications, createNotification, markAsRead } from '../services/notificationService'; // Importe le service de notifications
import Profile from './Profile';

function Dashboard () {
   
    const data = [
        { name: 'Janvier', employers: 400, formations: 240 },
        { name: 'Février', employers: 300, jobs: 139 },
        { name: 'Mars', employers: 200, jobs: 980 },
        { name: 'Avril', employers: 278, formations: 390 },
        { name: 'Mai', employers: 189, jobs: 480 },
        { name: 'Juin', employers: 239, jobs: 380 },
        { name: 'Juillet', employers: 349, jobs: 430 },
      ];
    const [isProfileOpen, setIsProfileOpen] = useState(false); // State for Profile dropdown
    const [isLanguageOpen, setIsLanguageOpen] = useState(false); // State for Language dropdown
    const [selectedLanguage, setSelectedLanguage] = useState('Ger'); // Langue par défaut
    const [selectedFlag, setSelectedFlag] = useState(GerFlag); // Drapeau par défaut
    const [isOpen, setIsOpen] = useState(false); // Gérer l'ouverture/fermeture du dropdown
    const [notifications, setNotifications] = useState([
        "Nouvelle commande",
        "Message non lu",
        "Mise à jour système",
        "Nouvelle connexion"
      ]); // Liste des notifications
      const addNotification = (message) => {
        setNotifications((prevNotifications) => [...prevNotifications, message]);
      };
      const logOut = () => {
        localStorage.removeItem('token'); // Supprimer le token du localStorage
        navigate('/login'); // Rediriger vers la page de login
    };
 
    const toggleProfileDropdown = (event) => {
        event.stopPropagation(); // Empêche la propagation de l'événement
        setIsProfileOpen(!isProfileOpen);
        setIsLanguageOpen(false); // Ensure language dropdown is closed when profile is opened
      };
      const toggleLanguageDropdown = (event) => {
        event.stopPropagation();
        setIsLanguageOpen(!isLanguageOpen);
        setIsProfileOpen(false); // Ensure profile dropdown is closed when language dropdown is opened
      };
    const handleProfileItemClick = () => {
        setIsProfileOpen(false); // Ferme le menu après avoir cliqué sur une option
    };
    const handleLanguageSelect = (language, flag) => {
        setSelectedLanguage(language); // Met à jour la langue sélectionnée
        setSelectedFlag(flag); // Met à jour le drapeau sélectionné
        setIsLanguageOpen(false); // Ferme le menu déroulant après la sélection
      };
      const toggleDropdown = () => {
        setIsOpen(!isOpen); // Ouvre ou ferme le dropdown
        if (!isOpen) {
          // Si on ouvre le dropdown, on masque le badge
          setNotifications([]);
        }
      };
      
        const handleDownload = () => {
          const link = document.createElement("a");
          link.href = "https://adc-transition.com/path/to/your/file.pdf"; // URL externe du fichier
          link.download = "file.pdf"; // Nom sous lequel le fichier sera téléchargé
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      //notification backend//
      useEffect(() => {
        const fetchNotifications = async () => {
          const userId = '1234'; // Id de l'utilisateur connecté (à récupérer dynamiquement)
          const data = await getNotifications(userId);
          setNotifications(data);
        };
    
        fetchNotifications(); // Récupère les notifications dès le chargement du composant
      }, []);
    
      const handleMarkAsRead = async (notificationId) => {
        await markAsRead(notificationId); // Marque la notification comme lue dans le backend
        setNotifications(notifications.filter(notif => notif._id !== notificationId)); // Met à jour la liste des notifications côté frontend
      };
      //reanintialisation de createaNotification/:
      const handleCreateNotification = async () => {
        const userId = '1234'; // Remplace par l'ID de l'utilisateur connecté
        const message = "Nouvelle notification"; // Message de la notification
    
        try {
          await createNotification({ userId, message });
          addNotification(message); // Ajoute la notification à l'état local
        } catch (error) {
          console.error("Erreur lors de la création de la notification :", error);
        }
      };
     
      return(
         <>
<div className="wrapper">
    <div className="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
      	<div className="sidebar-wrapper side-widh">
          
          <img src={image10} alt='dash' className="rounded-dash"></img>
{/* <Navbar /> */}
            <ul className="nav">
                  <li>
                    <Link to={"dashboard.html"} className="link-sidebar">
                    <FontAwesomeIcon icon={faChartPie} className="icon-sidebar me-3" />
                        Dashboard
                        </Link>
                </li>
                <li>
                <Link to={"user.html"} className="link-sidebar">
                <FontAwesomeIcon icon={faUser} className="icon-sidebar me-3"  />
                        User
                    </Link>
                </li>
                <li className="active">
                    <Link to={"note.html"} className="link-sidebar">
                    <FontAwesomeIcon icon={faClipboard} className="icon-sidebar me-3" />
                        Table List
                    </Link>
                </li>
                <li>
                    <Link to={'/profil'} className="link-sidebar">
                    <FontAwesomeIcon icon={faUserTie} className="icon-sidebar me-3"  />
            Candidates
                        </Link>
                </li>
                <li>
                    <Link to={'/employer'} className="link-sidebar">
                 <FontAwesomeIcon icon={faBuildingColumns}className="icon-sidebar me-3"  /> 
                    Employer       
                 </Link>
                </li>
              <li>
                    <Link to={'maps'} className="link-sidebar">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-sidebar me-3" />
                       Maps
                        </Link>
                </li>
                <li>
                    <Link to={'notification'} className="link-sidebar">
                    <FontAwesomeIcon icon={faCheck} className="icon-sidebar me-3" />
            Notification
                    </Link>
                </li>
                

				<li className="active-pro">
                    <Link to={'notification'} className="link-sidebar">
                    <FontAwesomeIcon icon={faUserGraduate}className="icon-sidebar me-3"  />
                        Up grade
                        </Link>
                </li>
               
            </ul>
    	</div>
    </div>

    <div className="main-panel">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid dashboard">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div className="d-flex" role="search">
             <input className="form-control me-2 search-form" type="search" placeholder="Search" aria-label="Search"/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-form'/>
         </div>    
    <div className="nav-user-wrapper first-div mb-3">
        <button  className="nav-user-btn dropdown-btn" title="My profile" type="button"onClick={toggleProfileDropdown} >
          <span className="sr-only">My profile</span>
          <div className="nav-user-img">
     <img src={ImageAvatar} className="user-img" alt="User name"/>
          </div>
        </button>
        
        {isProfileOpen && (
        <ul className="users-item-dropdown">
          <li><Link to="/profile" onClick={handleProfileItemClick} >
              <User aria-hidden="true"className='link-img'/>
              <span className='span-img'>Profile</span>
            </Link>
            </li>
          <li>
            <Link to="/setting" onClick={handleProfileItemClick} >
            <Settings aria-hidden="true" className='link-img'/>
              <span className='span-img'>settings</span>
            </Link>
            </li>
          <li>
            <Link className="danger" to="/" onClick= {(e) => {handleProfileItemClick(); logOut(); }}>
              <LogOut aria-hidden="true" className='link-img'/>
              <span className='span-img'>Log out</span>
            </Link></li>
        </ul>
         )}
      </div>
      

          </div>
          
          <div className="custom-select me-4">
      <button className="select-btn" onClick={toggleLanguageDropdown}>
        <img src={selectedFlag} alt="flag" className="flag-ger me-2" />
        {selectedLanguage}
      </button>
      {isLanguageOpen && (
        <div className="select-dropdown">
         <div className="option me-2" onClick={() => handleLanguageSelect('Eng', EngFlag)}>
    <img src={EngFlag} alt="Eng" className="flag-img me-2" />
    Eng
</div>
<div className="option me-2" onClick={() => handleLanguageSelect('Fr', FrFlag)}>
    <img src={FrFlag} alt="Fr" className="flag-img me-2" />
    Fr
</div>
<div className="option me-2" onClick={() => handleLanguageSelect('Usb', UsbFlag)}>
    <img src={UsbFlag} alt="Usb" className="flag-img me-2" />
    Usb
</div>
         
          <div className="option me-2" onClick={() => handleLanguageSelect('Ger',GerFlag)} >
            <img src={GerFlag} alt="Ger" className="flag-img me-2" />
            Ger
          </div>
        </div>
      )}
    </div>
    <div className="notification-wrapper me-4 mt-4">
    <button className="notification-button" onClick={toggleDropdown}>
      <FontAwesomeIcon icon={faBell} className="notification-icon" />
      {notifications.length > 0 && (
      <span className="notification-badge">{notifications.length}5</span>
    )}
      </button>

      {/* Dropdown des notifications */}
      {isOpen && (
        <div className="notification-dropdown">
          <ul>
          
            {notifications.length === 0 ? (
              <li> notification</li>
                         ) : (
                            notifications.map((notification) => (
                                <li key={notification._id}>
                                  {notification.message}
                                  <button onClick={() => handleMarkAsRead(notification._id)}>Marquer comme lue</button>
                                </li>
              ))
            )}
          </ul>
        </div>
         )}
          {/* Bouton pour tester l'ajout d'une notification */}
          <button className='create-notification' onClick={handleCreateNotification}>Create</button>
      
    </div>

    <button onClick={handleDownload} className="download-btn me-5">
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
       </button>
       
 
  
        
        
    
      
    </div>
    
 
</nav>

           
        <div className="content">
            <div className="container-fluid dash-fluid">
                <div className="row">
                    <div className=" col-lg-12 col-sm-12">
                   
                    <div style={{ width: '100%', height: 400 }}>
      <h2 className='title-stat'>Statistics new users</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="employers" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="jobs" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <Profile /> 
    {/* Intégration du profil */}
                   
                    </div>

           


                </div>
            </div>
        </div>

        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul className="footer-position">
                        <li>
                            <Link to="/home" className="blue-link">
                                Home
                            </Link>
                        </li>
                        <li>
                             <Link to="/company" className="blue-link">
                                Company
                            </Link>
                        </li>
                        <li>
                        <Link to="/portfolio" className="blue-link">
                                Portfolio
                            </Link>
                        </li>
                        <li>
                        <Link to="/blog" className="blue-link">
                                Blog
                            </Link>
                        </li>
                    </ul>
                  <span className="pull-right">
  &copy; {new Date().getFullYear()} <Link to="http://www.creative-tim.com">Adc-transition</Link>, made with love for a better web
</span>

                </nav>
                
            </div>
        </footer>


    </div>
</div>


         </>

      )
}

export default Dashboard;

  

    
    

      

