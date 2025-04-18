
import './App.css'
import BlogArea from './components/article/blogArea'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../src/firebaseConfig';




function App() {

  const [blogs, setBlogs] = useState([]);

  const getInitials = (name) => name.split(' ').slice(0, 2).map(part => part.charAt(0)).join('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogCard'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(data);
    };

    fetchBlogs();
  }, []);
  
  return (
    <>
    <Navbar
    name = 'PY'
    />
    <BlogArea
    blogs = {blogs}
    getInitials = {getInitials}
    />
    </>
  )
}

export default App
