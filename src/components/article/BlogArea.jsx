import React from 'react'
import BlogCard from './blogCard';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebaseConfig';



 function BlogArea() {

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
    <div className='mt-5 flex flex-col justify-center items-center space-y-10'>
      {blogs.map( card=>(
        <BlogCard
        key={card.id}
        title={card.title}
        initials = {getInitials(card.name)}
        name= {card.name}
        date= '15 April, 2024'
        article = {card.article}
        likes = {card.likes}
        />
      ))}
    
    </div>

  
    </>
  )
}
export default BlogArea;