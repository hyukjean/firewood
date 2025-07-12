import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isMobile = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-[1400px] mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default MainLayout; 