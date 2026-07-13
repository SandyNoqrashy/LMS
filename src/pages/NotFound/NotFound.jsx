import React from 'react';

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white px-6 py-12 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
        
        {/* Icon */}
        <div className="text-5xl md:text-6xl mb-6">🔍</div>
        
        {/* Title & Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        
        {/* Description */}
        <p className="text-sm md:text-base text-gray-500 mb-8 px-2">
          Sorry, the page you are looking for does not exist or has been moved. 
          Please check the URL or return to the home page.
        </p>
        
        {/* Action Button */}
        <button 
          onClick={() => window.location.href = '/'} 
          className="w-full md:w-auto px-8 py-3 bg-[#B08DF7] text-white rounded-lg hover:bg-[#a07df5] transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;