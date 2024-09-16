import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon } from "../icons" 

interface CopyableAddressProps {
    address: string; 
}

const CopyableAddress: React.FC<CopyableAddressProps> = ({ address }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };
  
    return (
      <CopyToClipboard text={address} onCopy={handleCopy}>
        <div
          className={`flex items-center rounded-lg w-fit cursor-pointer p-1 transition-colors duration-300 ${
            copied ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
     
          <span className="text-white text-xs pr-2">Copy this address </span> <CopyIcon/>

        </div>
      </CopyToClipboard>
    );
  };

  export default CopyableAddress; 