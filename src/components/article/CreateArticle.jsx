import React from 'react'
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function CreateArticle() {
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title || !article) {
        toast.error("Please fill out all fields");
        return;
      }
  
      try {
        if (!user) {
          toast.error("You must be logged in to post");
          return;
        }
  
        await addDoc(collection(db, "blogCard"), {
          title,
          article,
          userId: user.uid,
          name: user.displayName || user.email,
          date: new Date()
        });
  
        setTitle('');
        setArticle('');
        toast.success("Article posted successfully!");

        setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
      } catch (error) {
        console.error("Error posting article:", error);
        toast.error("Failed to post article");
      }
    };

  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-indigo-200'>
        <div className='bg-white p-10 rounded-lg'>
        <Link to={'/dashboard'} >
            <button className='flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg mb-5 hover:bg-indigo-700'>
            <FiArrowLeft style={{ marginRight: '5px' }} />
                <div>Back</div></button>
        </Link>
            <form onSubmit={handleSubmit}
            className='space-y-5'
            >
                <div className='flex flex-col space-y-4'>
                <label htmlFor="" className='text-xl font-semibold'>Title</label>
                <input type="text" id="title"  value={title}  onChange={(e) => setTitle(e.target.value)}
                className='w-full p-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y'
                 />
                </div>
                <div className='flex flex-col space-y-4 '>
                <label htmlFor="" className='text-xl font-semibold'>Article</label>
                <textarea id="article" value={article}  onChange={(e) => setArticle(e.target.value)}
                className='w-full min-h-[400px] min-w-[800px] p-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y' />
                </div>
                <div className='flex flex-col space-y-4'>
                    <button type='submit' className='py-2 px-4 bg-indigo-500 rounded-lg text-white w-auto hover:bg-indigo-700'>Post Article</button>
                </div>
             

            </form>
        </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
