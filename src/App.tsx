import React from 'react';
import ReactDOM from 'react-dom';
import { AuthForm } from './components/AuthForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Social Media Marketplace
            </h1>
            <p className="text-lg text-gray-600">
              Connect, share, and trade securely with our end-to-end encrypted platform.
            </p>
          </div>
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
}

export default App;