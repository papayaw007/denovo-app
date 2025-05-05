
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, onSnapshot,  updateDoc, increment, doc } from 'firebase/firestore';

import { db } from '../src/firebaseConfig';
// import { auth } from '../src/firebaseConfig';



import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';



function App() {

  const [blogs, setBlogs] = useState([]);



  const getInitials = (name) => name.split(' ').slice(0, 2).map(part => part.charAt(0)).join('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogCard"), (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    });
  
    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLike = async (id) => {
    const articleRef = doc(db, "blogCard", id); // This points to the Firestore doc
  
    try {
      await updateDoc(articleRef, {
        likes: increment(1), // Adds 1 to the current value of 'likes'
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };



  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home
      
       blogs = {blogs}
       getInitials = {getInitials}
       handleLike={handleLike}
      />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard
          blogs = {blogs}
          getInitials = {getInitials}
          handleLike={handleLike}
          />
        </ProtectedRoute>
      }/>
    </Routes>
   </Router>
  )
}

export default App
