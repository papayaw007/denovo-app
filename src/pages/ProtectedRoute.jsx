import React from 'react'
 import { Navigate } from 'react-router-dom';
 import { useAuthState } from 'react-firebase-hooks/auth';
 import { auth } from '../firebaseConfig';  // your firebase setup



export default function ProtectedRoute({children}) {

    const [user, loading] = useAuthState(auth);
    console.log(user);

    if (loading) {
      return <div>Loading...</div>; // Show a loading state while checking
    }
  
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
}