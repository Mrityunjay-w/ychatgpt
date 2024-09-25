import React from 'react'
import './../../styles/Header.css'
import './../../styles/Login.css'


const Header = () => {

    return (
        <div>
              <header className='loginHeader'>
               <div className='container' style={{maxWidth:'1660px'}}>
                  <a>
                     <img className='headerLogo' src='assets/logo.png' alt='logo' />
                  </a>


                  <div className='buttonContainer'>

                     {/* {isAdminUser() && (
                        <button
                           className='btnAdmin'
                           onClick={handleAdminMenuClick}
                        >
                           Admin
                        </button>
                     )} */}

                     {/* <button className='btnLogin' onClick={handleLogout}>Logout</button> */}

                  </div>
               </div>

            </header>
        </div>
    )
}

export default Header;