import React, { useState } from 'react';
import Button from '../button';

interface PasswordVerificationProps {
  onVerify: (password: string) => void;
}

const PasswordVerification: React.FC<PasswordVerificationProps> = ({ onVerify }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleVerify = () => {
    onVerify(password);
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className='my-3'>
      <Button text='Verify' onClick={handleVerify}/>
      </div>
    
    </div>
  );
};

export default PasswordVerification;