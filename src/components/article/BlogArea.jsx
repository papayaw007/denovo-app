import React from 'react'
import BlogCard from './blogCard';



 function BlogArea() {
  return (
    <>
    <div className='mt-5 flex flex-col justify-center items-center space-y-10'>
    <BlogCard
   title="PY is making his first real life project"
   initials = 'PY'
   name= 'Papa Yaw Adu-Asare'
   date= '24 Aug. 2024'
   article = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum aut quod nemo quibusdam, suscipit incidunt porro nisi eius veritatis ratione rem ex. Rerum aliquam ex, molestiae iure quis perferendis? Totam?'
   likes = '100'
   />
    <BlogCard
   title="PY is making his first real life project"
   initials = 'P.Y'
   name= 'Papa Yaw Adu-Asare'
   date= '24 Aug. 2024'
   article = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum aut quod nemo quibusdam, suscipit incidunt porro nisi eius veritatis ratione rem ex. Rerum aliquam ex, molestiae iure quis perferendis? Totam?'
   likes = '100'
   />
    </div>
  
    </>
  )
}
export default BlogArea;