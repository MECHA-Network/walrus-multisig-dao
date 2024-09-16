import React, { useState } from 'react';

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
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default PasswordVerification;