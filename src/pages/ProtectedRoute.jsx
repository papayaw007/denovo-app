import React from 'react'
import { Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebaseConfig';  // your firebase setup


export default function ProtectedRoute() {

    // const [user, loading] = useAuthState(auth);

    // if (loading) return <div>Loading...</div>;
 
    // return user ? children : <Navigate to="/login" />;

    return (
        <>
        <div>Hello Authentication</div>
        </>
    )
}