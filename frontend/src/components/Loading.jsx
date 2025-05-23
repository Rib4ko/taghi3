import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
        </div>
    );
};

export default Loading;