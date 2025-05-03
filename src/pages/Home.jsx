import React from 'react'

import BlogArea from '../components/article/blogArea'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import { collection, onSnapshot,  updateDoc, increment, doc } from 'firebase/firestore';

import { db } from '../firebaseConfig';


export default function Home() {

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
    <>
    <Navbar
    name = 'User'
    />
    <BlogArea
    blogs = {blogs}
    getInitials = {getInitials}
    handleLike={handleLike}
    />
    </>
  )
}
