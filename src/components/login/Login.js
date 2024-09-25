import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig"; // Ensure this path is correct
import "./../../styles/Login.css";
import Image from "../image/Images";
import VideoButton from "./AnimatedGif"; // Import VideoButton component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = async () => {
    if (!redirecting && isChecked1 && isChecked2) {
      try {
        setRedirecting(true);
        await instance.loginRedirect(loginRequest); // Trigger MSAL login redirect
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to authenticate.");
      }
    } else {
      setErrorMessage("Please check both checkboxes before logging in.");
    }
  };

  const handleFAQ = () => {
    navigate("/faq");
  };

  const handleCustomerQnA = () => {
    navigate("/customerqna");
  };

  return (
    <>
      <div>
        {/* Header Section */}
        <div className="bg-[#1f4e96] text-3xl text-white text-center py-2 h-20 flex items-center px-10">
          <div className="bannerHeader">
            <span className="branding2 font-bold">Y-ChatGPT</span>
          </div>
          <div className="flex items-center ml-auto relative">
            <VideoButton
              className="overlapping-text"
              onClick={handleCustomerQnA}
            />
            <button onClick={handleFAQ} className="text-white mr-5">
              FAQ
            </button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="imageContainer">
          <img
            className="mainImage"
            src={Image.trademark2}
            alt="Yokogawa Logo"
          />

          <div className="contentContainer flex flex-col">
            <label>
              <input
                type="checkbox"
                className="checkbox1"
                onChange={() => setIsChecked1(!isChecked1)}
              />
            </label>
            <h5 className="font-semibold text-lg">
              Confidentiality Disclaimer:
            </h5>
            <p className="paracontent">
              Unauthorized sharing of sensitive organizational data outside the
              network is strictly prohibited. Any dissemination, distribution,
              or disclosure of confidential information to external parties and
              vice versa is expressly forbidden. Violation of this policy may
              result in legal consequences. Please ensure the responsible and
              secure handling of confidential data within the designated network
              boundaries.
            </p>
            <label>
              <input
                type="checkbox"
                className="checkbox2"
                onChange={() => setIsChecked2(!isChecked2)}
              />
            </label>

            <p className="paracontentP">
              Protect your privacy, safeguard your data, keep confidential
              information within the organization. Respect personal boundaries,
              honor confidentiality: your data, your trust, our responsibility.
            </p>
          </div>

          {/* Login Button */}
          <div className="mt-4">
            {isChecked1 && isChecked2 && (
              <button
                className="btbLoingDown bg-blue-600 text-white rounded"
                onClick={handleRedirect}
                style={{
                  width: "120px",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                Login
              </button>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
        </footer>
      </div>

      {/*                
                    <div className='mt-4'>
                        {(isChecked1 && isChecked2) && (
                            <button
                                className="btbLoingDown text-white rounded"
                                onClick={handleRedirect}
                                style={{ width: '120px', fontWeight: 'bold', fontSize: 'large'}}
                            >
                               <span style={{color:'rgb(31, 78, 150)'}}>LogIn</span>
                            </button>
                        )}
                    </div>

                 
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>

          
                <footer>                    
                    <p style={{marginTop: '530px', marginLeft: '1200px', position:'relative' }}>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
                </footer>
            </div> */}
    </>
  );
};

export default Login;
