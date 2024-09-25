import React, { useEffect, useState } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { Configuration } from 'msal';
import jwtDecode from 'jwt-decode';

const Decode = () => {
    const { instance } = useMsal();
    const [secretKey, setSecretKey] = useState('');
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const fetchSecretKey = async () => {
        try {
          const response = await fetch('/api/secret-key'); // Replace with your API endpoint
          const data = await response.json();
          setSecretKey(data.secretKey);
  
          // Extract username from the JWT 
          const decodedToken = jwtDecode(data.secretKey);
          setUsername(decodedToken.preferred_username || '');
        } catch (error) {
          console.error('Error fetching secret key:', error);
        }
      };
  
      fetchSecretKey();
    }, []);
  
    
    // const msalConfig: Configuration = {
    //   auth: {
    //     clientId: 'your_client_id_here',
    //     authority: 'https://login.microsoftonline.com/your_tenant_id_here',
    //     clientSecret: secretKey,
    //   },
    // };
  
    return (
      <MsalProvider instance={instance} authenticationRequest={msalConfig}>
        {/* Your component content here */}
        <div>
          
          <p>User: {username}</p>
          {/* Additional content */}
        </div>
      </MsalProvider>
    );
}

export default Decode;