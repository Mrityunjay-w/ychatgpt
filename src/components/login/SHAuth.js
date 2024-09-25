import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import Home from '../home/Home';
import Login from './Login';
import CircularProgress from '@mui/material/CircularProgress';
import Loaders from './Loaders';
const SHAuth = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  // Track the loading state

    useEffect(() => {
        const checkAuthentication = async () => {
            const accounts = instance.getAllAccounts();
            const authenticated = accounts.length > 0;
            setIsAuthenticated(authenticated);

            if (authenticated) {
                // Simulate delay for demo purposes, remove if unnecessary
                setTimeout(() => {
                    navigate('/home');  // Redirect to home after a delay (if needed)
                }, 2000);  // Optional: Add delay to simulate loading
            } else {
                setLoading(false);  // Stop loading if not authenticated
            }
        };

        checkAuthentication();  // Check authentication state on component load
    }, [instance, navigate]);

    // if (loading) {
    //     return <Loaders />; // Show loaders while checking authentication
    // }
    // Show loading screen while redirecting
    if (isAuthenticated && loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#fff'
            }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            {isAuthenticated ? <Home /> : <Login />}  {/* Conditional rendering based on authentication */}
        </div>
    );
};

export default SHAuth;
