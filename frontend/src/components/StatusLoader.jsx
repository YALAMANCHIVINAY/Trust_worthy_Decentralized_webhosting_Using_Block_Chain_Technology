import React from 'react';

const StatusLoader = ({ message, type = 'loading' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'loading':
      default:
        return <div className="spinner"></div>;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-4">
        {getIcon()}
      </div>
      <p className={`text-lg font-medium ${getTextColor()}`}>
        {message}
      </p>
    </div>
  );
};

export default StatusLoader;
