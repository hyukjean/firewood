import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-4 md:mb-8">
      <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-1 md:mb-2">
        🔥 장작
      </h1>
      <p className="text-sm md:text-lg text-gray-700">
        커뮤니티를 활활 태울 장작을 제작해보세요.
      </p>
    </div>
  );
};

export default Header; 