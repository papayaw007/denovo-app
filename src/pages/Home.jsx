import React from 'react'

import BlogArea from '../components/article/BlogArea'
import Navbar from '../components/Navbar'




export default function Home({blogs,getInitials,handleLike}) {



  return (
    <>
    <Navbar
  
    />
    <BlogArea
    blogs = {blogs}
    getInitials = {getInitials}
    handleLike={handleLike}
    />
    </>
  )
}
