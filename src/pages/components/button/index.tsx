// src/Button.tsx
import React from 'react';

interface ButtonProps {
  text: string; // Text to display on the button
  onClick: () => void | ((password: string) => void); // Function to call on button click
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700"
      style={{
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {text}
    </button>
  );
};

export default Button;