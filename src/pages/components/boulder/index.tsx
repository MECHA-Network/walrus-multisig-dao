import React from 'react';

interface BoulderProps {
  text: string;
  gradient: string; // CSS gradient string
  textColor: string;
  textSize: string;
}

const Boulder: React.FC<BoulderProps> = ({ text, gradient, textColor="black", textSize="24px" }) => {
    return (
      <div
        className="rounded-lg flex justify-center items-center shadow-lg transform perspective-600"
        style={{
          background: gradient,
          border: '1px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.2)',
          maxWidth: 'fit-content',
          padding: '12px',
        }}
      >
        <div
          className="text-2xl text-center"
          style={{
            color: textColor,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      </div>
    );
  };
  

export default Boulder;