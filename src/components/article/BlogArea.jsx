import React from 'react'
import BlogCard from './BlogCard';
import ArticlePage from './ArticlePage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



 function BlogArea({blogs, getInitials, handleLike}) {

  const [selectedArticle, setSelectedArticle] = useState(null);
  // const [selectedSum, setSelectedSum] = useState(null);
  const navigate = useNavigate();
  

  const handleReadMore = (id) => {
    const selected = blogs.find((article) => article.id === id);
    setSelectedArticle(selected);
  };

  const handleSummarize = (id) => {
    const selected = blogs.find((article) => article.id === id);
    navigate('/summarize', { state: { selected } });
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
            articleid ={card.id}
            key={card.id}
            title={card.title}
            initials = {getInitials(card.name)}
            name= {card.name}
            date= { card.date.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            article = {card.article}
            likes = {card.likes}
            onReadMore={()=>handleReadMore(card.id)}
            handleLike= {()=> handleLike(card.id)}
            handleSummarize={()=>handleSummarize(card.id)}
            />
          ))

        )
      }
    </div>


  
    </>
  )
}
export default BlogArea;