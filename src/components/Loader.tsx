import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs">
       <div className="loader"></div>
    </div>
  );
};

export default Loader;