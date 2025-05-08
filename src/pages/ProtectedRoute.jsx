import React from 'react'
 import { Navigate } from 'react-router-dom';
 import { useAuthState } from 'react-firebase-hooks/auth';
 import { auth } from '../firebaseConfig'; 



export default function ProtectedRoute({children}) {

    const [user, loading] = useAuthState(auth);
 

    if (loading) {
      return <div><p className="flex mt-96 justify-center items-center text-6xl text-indigo-600 font-bold animate-bounce ">DENOVO...</p></div>;
    }
  
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
}