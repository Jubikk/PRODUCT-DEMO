import React, { useState, useRef, useEffect } from 'react';

const TruncatedText = ({ text, maxLength = 100, className = '' }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const textRef = useRef(null);
  
  // Check if text needs truncation
  const needsTruncation = text.length > maxLength;
  const displayText = isTruncated && needsTruncation 
    ? `${text.substring(0, maxLength)}...` 
    : text;

  const handleToggle = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to parent elements
    setIsTruncated(!isTruncated);
  };

  return (
    <div className={className}>
      <span ref={textRef}>{displayText}</span>
      {needsTruncation && (
        <button 
          onClick={handleToggle}
          className="text-blue-500 hover:underline ml-1 text-sm focus:outline-none"
        >
          {isTruncated ? 'more' : 'less'}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
