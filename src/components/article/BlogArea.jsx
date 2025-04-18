import React from 'react'
import BlogCard from './blogCard';
import ArticlePage from './ArticlePage';
import { useState } from 'react';



 function BlogArea({blogs, getInitials}) {

  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleReadMore = (id) => {
    const selected = blogs.find((article) => article.id === id);
    setSelectedArticle(selected);
  };

  const onBack = () =>{
    setSelectedArticle(null);
  }

  return (
    <>
    <div className='mt-5 flex flex-col justify-center items-center space-y-10'>
      {

        selectedArticle ? (
          <ArticlePage
          art = {selectedArticle}
          onBack = {()=> onBack()}
          />
        ) : (
          blogs.map( card=>(
            <BlogCard
            key={card.id}
            title={card.title}
            initials = {getInitials(card.name)}
            name= {card.name}
            date= '15 April, 2024'
            article = {card.article}
            likes = {card.likes}
            onReadMore={()=>handleReadMore(card.id)}
            />
          ))

        )
      }
    </div>


  
    </>
  )
}
export default BlogArea;