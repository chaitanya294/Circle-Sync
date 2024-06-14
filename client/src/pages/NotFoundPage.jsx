import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold text-black mb-4">404</div>
      <div className="text-2xl text-black mb-8">Oops! Page not found.</div>
      <div className="text-lg text-black mb-4">
        It seems like you've wandered off your path!
      </div>
      <div className="text-lg text-black mb-4">
        Double-check your coordinates or hit the back button to return.
      </div>
    </div>
  );
}

export default NotFoundPage;
