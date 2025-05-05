import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const [user] = useAuthState(auth);

  const user1 = auth.currentUser;
  let displayName;
  if (auth.currentUser){
     displayName = user1.displayName
   
  }else{
    displayName = 'User';
  }
  


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
    <main>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-15">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-0 w-full sm:w-auto">
          <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">
            DENOVO.
          </div>
          <div className="font-medium text-indigo-500 cursor-pointer bg-indigo-200 px-4 py-2 rounded-md  sm:ml-6 lg:ml-25">
             <Link to='/'>Home</Link>
          </div>
          <div className="font-medium text-gray-600 cursor-pointer  sm:ml-6 lg:ml-10">
            Hello, {displayName}
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <ul className="flex justify-center sm:justify-end items-center space-x-3 sm:space-x-8">
            { !user && <Link to="/login">
              <li className="font-medium text-indigo-600 rounded-lg hover:text-indigo-400 cursor-pointer text-sm sm:text-base">
                Log In
              </li>
            </Link>}
            { user && <Link to="/dashboard">
              <li className="font-medium text-indigo-600 rounded-lg hover:text-indigo-400 cursor-pointer text-sm sm:text-base">
                Dashboard
              </li>
            </Link>}
          { !user && <Link to="/signup">
              <li className="px-4 sm:px-5 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-400 cursor-pointer text-sm sm:text-base">
                Sign Up
              </li>
            </Link>}

      { user && <li className="px-4 sm:px-5 py-2 bg-red-600 rounded-lg text-white hover:bg-red-400 cursor-pointer text-sm sm:text-base">
                <button onClick={handleLogout}>Sign Out</button>
              </li>}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
