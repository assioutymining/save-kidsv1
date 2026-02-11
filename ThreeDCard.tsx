
import React from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`group perspective-1000 ${className}`}>
      <div className="relative transition-all duration-500 preserve-3d group-hover:[transform:rotateX(2deg)rotateY(-2deg)] group-hover:shadow-[20px_20px_60px_rgba(0,0,0,0.5),-5px_-5px_30px_rgba(220,38,38,0.05)] rounded-[3rem]">
        {children}
      </div>
    </div>
  );
};

export default ThreeDCard;
