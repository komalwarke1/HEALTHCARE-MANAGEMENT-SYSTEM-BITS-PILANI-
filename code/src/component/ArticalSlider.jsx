import React, { useState, useEffect } from "react"
import axios from "axios"
import HealthArticlesCards from "./HealthArticlescards"

function ArticleSlider() {
  const [articles, setArticles] = useState([])
  const API_KEY = "300299369a9741dda8a6a651d9262aa9" // Replace with your actual API key

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            category: "health",
            language: "en",
            pageSize: 6,
            apiKey: API_KEY,
          },
        })

        const articleData = response.data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          description: article.description,
          category: "Health",
          imageUrl: article.urlToImage,
          readTime: `${Math.floor(Math.random() * 7) + 3} min read`,
        }))

        setArticles(articleData)
      } catch (error) {
        console.error("Error fetching articles:", error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50  rounded-2xl shadow-xl">
      <HealthArticlesCards articles={articles} />
    </div>
  )
}

export default ArticleSlider

