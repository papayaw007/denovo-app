import React from 'react'
import { FiArrowLeft } from 'react-icons/fi';



 function ArticlePage({art, onBack}) {
  return (
    <>
    <div className='min-h-screen p-10'>
        <div>
            <button  onClick={()=> onBack()} className='flex justify-center items-center bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md'>
            <FiArrowLeft style={{ marginRight: '5px' }} />
               Back</button>
               <div className='p-20 space-y-5 mt-5'>
                <div className=' rounded-md'>
                <p className='text-5xl font-bold '>{art.title}</p>
            <div className='flex justify-between py-5'>
            <p className='font-thin text-gray-600'>{art.name}</p>
            <p className='font-thin text-gray-600'>18 April, 2024</p>
            </div>
                </div>
            <p className='text-lg leading-relaxed '>{art.article}</p>

               </div> 
        </div>
    </div>
    </>
  )
}

export default ArticlePage