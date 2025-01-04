import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const HealthArticlesCards = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = React.useRef(null);

  const slideNext = () => {
    if (sliderRef.current && currentIndex < articles.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * sliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const slidePrev = () => {
    if (sliderRef.current && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      sliderRef.current.scrollTo({
        left: newIndex * sliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const LoadingSkeleton = () => (
    <div className="flex gap-6 overflow-hidden px-6">
      {[...Array(3)].map((_, index) => (
        <div 
          key={index} 
          className="min-w-full md:min-w-[calc(50%-24px)] lg:min-w-[calc(33.333%-24px)] rounded-2xl border border-gray-100 p-5 space-y-4 bg-white"
        >
          <div className="animate-pulse bg-gray-100 h-52 w-full rounded-xl" />
          <div className="animate-pulse bg-gray-100 h-5 w-3/4 rounded-full" />
          <div className="animate-pulse bg-gray-100 h-4 w-full rounded-full" />
          <div className="flex justify-between items-center">
            <div className="animate-pulse bg-gray-100 h-4 w-20 rounded-full" />
            <div className="animate-pulse bg-gray-100 h-4 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  if (!articles || articles.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 px-4">
        Latest Health News
        <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full" />
      </h2>
      
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth px-4"
      >
        {articles.map((article) => (
          <div 
            key={article.id}
            className="min-w-full md:min-w-[calc(50%-24px)] lg:min-w-[calc(33.333%-24px)] rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={article.imageUrl || '/api/placeholder/400/250'}
                alt={article.title}
                className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/250';
                }}
              />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                {article.category}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-xl leading-tight line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-600 line-clamp-2 leading-relaxed">
                {article.description || 'No description available'}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg>
                  {article.readTime}
                </span>
                <button 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  Read More
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {articles.length > 1 && (
        <>
          <button
            onClick={slidePrev}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <button
            onClick={slideNext}
            disabled={currentIndex === articles.length - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all ${
              currentIndex === articles.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </>
      )}
      
      <div className="flex justify-center gap-2 mt-8">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              sliderRef.current.scrollTo({
                left: index * sliderRef.current.offsetWidth,
                behavior: 'smooth'
              });
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-blue-600 w-8' 
                : 'bg-gray-200 w-2 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthArticlesCards;