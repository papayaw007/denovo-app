import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

export default function Dashboard() {
    const navigate = useNavigate();

    
    const handleLogout = async () => {
        try {
            await signOut(auth);  
            navigate('/login');   
        } catch (error) {
            console.error('Error signing out: ', error.message);
        }
    };

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Log Out
            </button>
        </div>
    );
}
