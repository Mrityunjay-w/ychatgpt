// withAuthRedirect.js
import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthAndRedirect = async () => {
        const accounts = await instance.getAllAccounts();
        if (accounts.length === 0) {
          // No user signed in, redirect to sign-in page
         // navigate('/signin');
        }
      };

      checkAuthAndRedirect();
    }, [instance, navigate]);

    return <WrappedComponent {...props} />;
  };
<div>


  
</div>
  return Wrapper;
};

export default withAuthRedirect;
