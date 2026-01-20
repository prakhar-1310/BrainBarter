import React, { useState } from 'react';

export function ImageWithFallback({ src, alt, fallback, className = '' }) {
  const [error, setError] = useState(false);
  
  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
