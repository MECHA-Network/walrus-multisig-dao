// src/Boulder.tsx
import React from 'react';

interface BoulderProps {
  text: string;
  gradient: string; // CSS gradient string
  textColor: string; // Text color
  textSize: string; // Text size (e.g., "20px", "1.5rem")
  children?: React.ReactNode; // Allow for nested components
}

const Boulder: React.FC<BoulderProps> = ({ text, gradient, textColor, textSize, children }) => {
    return (
        <div
          className="rounded-lg flex justify-center items-center w-full shadow-lg transform perspective-600"
          style={{
            background: gradient,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.2)',
            maxWidth: 'fit-content',
            padding: '6px 12px',
          }}
        >
          <div
            className="text-center"
            style={{
              color: textColor,
              fontSize: textSize,
              padding: '12px',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </div>
          {children} {/* Render any children passed to the Boulder component */}
        </div>
      );
};

export default Boulder;