import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0b1ef9fc4f7b4b72a587d9fece2df1bf`);
        if (response.data.articles) setArticles(response.data.articles);
        else throw new Error('No articles found');
      } catch {
        setError('API request limit has been reached due to free tier restrictions. Please try again later or check back tomorrow when the limit resets.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="news-container">
      <button className="close-button1" onClick={() => navigate('/')}>✖️</button>
      <h1>Live News</h1>
      
      {loading && (
        <div className="loading-animation">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && articles.length === 0 && (
        <p className="no-articles">No articles available at the moment.</p>
      )}
      
      <div className="news-grid">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            {article.urlToImage ? (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="article-image" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x180?text=News';
                }}
              />
            ) : (
              <img src="https://via.placeholder.com/300x180?text=News" aria-hidden="true" 
                alt="No image available" 
                className="article-image" 
              />
            )}
            <div className="news-content">
              <h2>{truncateText(article.title, 80)}</h2>
              <p>{truncateText(article.description, 150)}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;