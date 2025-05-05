import React from "react";
import Navbar from "../components/Navbar";
import { IoAddOutline } from "react-icons/io5";
import { auth, db } from "../firebaseConfig";
import { useState, useEffect } from "react";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import BlogCard from "../components/article/BlogCard";
import ArticlePage from "../components/article/ArticlePage";

export default function Dashboard({ blogs, getInitials, handleLike }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleReadMore = (id) => {
    const selected = blogs.find((article) => article.id === id);
    setSelectedArticle(selected);
  };

  const onBack = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    const fetchArticlesByUserName = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.error("No user is signed in");
          return;
        }

        // Step 1: Get the user's name from the "users" collection
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          console.error("User data not found in Firestore");
          return;
        }

        const userName = userDoc.data().name;


        // Step 2: Query the articles collection where name === userName
        const articlesRef = collection(db, "blogCard");
        const q = query(articlesRef, where("name", "==", userName));
        const querySnapshot = await getDocs(q);

        const userArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(userArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesByUserName();
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div>
      <Navbar />
      <div className="flex justify-between py-20 px-15">
        <div className="text-xl font-medium">Welcome to Denovo Dashboard!</div>
        <div>
          <button className="flex items-center space-x-2 py-2 px-4 bg-indigo-500 rounded-lg text-white hover:bg-indigo-700">
            <IoAddOutline className="text-xl" />
            <div>Add Article</div>
          </button>
        </div>
      </div>
      <h1 className="flex justify-center items-center text-3xl font-medium mb-10">
        My Articles
      </h1>
      <div>
        <div className="flex flex-col space-y-10 py-5 justify-center items-center">
          {selectedArticle ? (
            <ArticlePage art={selectedArticle} onBack={() => onBack()} />
          ) : articles.length === 0 ? (
            <p>No articles found for your user.</p>
          ) : (
            articles.map((article) => (
              <BlogCard
                key={article.id}
                title={article.title}
                initials={getInitials(article.name)}
                name={article.name}
                date={article.date.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                article={article.article}
                likes={article.likes}
                onReadMore={() => handleReadMore(article.id)}
                handleLike={() => handleLike(article.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
