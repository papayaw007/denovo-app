import React from 'react'
import { MdEdit } from 'react-icons/md'; // Material Icons
import { FaTrash } from 'react-icons/fa';
import { RiThumbUpFill } from 'react-icons/ri'; // Filled
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig'; 
import { useLocation } from 'react-router-dom';








    function BlogCard({title, initials, name, date, article, likes, onReadMore, handleLike, handleDelete}) {

      const [user] = useAuthState(auth);
      const location = useLocation();
 

      

    
        
  return (
    <>
    <div className='flex flex-col w-full sm:w-3/4 lg:w-1/2 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 rounded-md bg-gray-100'>
  <p className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>{title}</p>
  <div className='flex items-center space-x-2 mb-2'>
    <div className='rounded-full bg-indigo-400 text-white w-fit py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base'>{initials}</div>
    <p className='text-gray-500 text-sm sm:text-base'>{name}</p>
  </div>
  <p className='text-xs sm:text-sm text-gray-500 flex justify-end items-center mb-2'>{date}</p>
  <p className='mb-4 text-sm sm:text-base'>{article.slice(0,200)}...   </p>
  
  <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0'>
    <div className='flex justify-between sm:justify-end items-center w-full sm:space-x-4 lg:space-x-20 sm:ml-auto'>
      <div className='flex justify-center items-center space-x-1 sm:space-x-2'>
        <p className='text-xs sm:text-sm text-gray-500'><span>{likes}</span> likes</p>
        <div className='flex justify-center items-center'>
          <button onClick={handleLike}>
            <RiThumbUpFill className="text-lg sm:text-xl text-indigo-500 hover:text-indigo-700 cursor-pointer" />
          </button>
        </div>
      </div>
      
      <div className='flex space-x-2'>
        <button onClick = {()=>onReadMore(article)} className='px-3 sm:px-4 py-1 sm:py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md text-xs sm:text-sm'>Read More</button>
       { user && location.pathname === '/dashboard' &&  <button>
          <MdEdit className="hidden text-indigo-700 text-lg sm:text-xl hover:text-indigo-500 cursor-pointer" />
        </button> }
      { user && location.pathname === '/dashboard' && <button onClick={handleDelete}>
        <FaTrash className="text-red-500 text-lg sm:text-xl hover:text-red-700 cursor-pointer" />
      </button> }
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default BlogCard;