import React, { useEffect, useState } from 'react';
import Boulder from '../boulder';
import {gradientOptions} from '../boulder/gradients';
import { shortenSuiAddress } from "../utils"
import CopyableAddress from "../copyText";

const Wallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  
  useEffect(() => {
    async function getWalletAddress() {
       const address = await chrome.storage.local.get("suiAddress");
       setWalletAddress(address.suiAddress);
    }
    getWalletAddress();
  })

  const outerGradient = 'linear-gradient(to bottom right, #ffffff, #f0f0f0)';

  return (
    <div className='mt-5'>
        <Boulder text="" gradient={outerGradient} textColor="#ffffff" textSize="20px">
      <div className="flex flex-col items-center w-full space-y-2" style={{ padding: '12px' }}>
        <Boulder text="- Single Addresses -" gradient={gradientOptions.blueGradient.gradient} textColor={gradientOptions.blueGradient.color} textSize={"15px"} />
        <Boulder text={shortenSuiAddress(walletAddress)} gradient={gradientOptions.coolBlueGradient.gradient} textColor={gradientOptions.coolBlueGradient.color} textSize={"11px"} >  
        </Boulder>
        <CopyableAddress address={walletAddress}/> 
      </div>
    </Boulder>
  
        <br />
        <Boulder text="" gradient={outerGradient} textColor="#ffffff" textSize="20px">
            <div className="flex flex-col items-center space-y-2">
                <Boulder text="- Multisig Addresses -" gradient={gradientOptions.warmCoralGradient.gradient} textColor={gradientOptions.warmCoralGradient.color} textSize={"15px"} />
                <Boulder text={shortenSuiAddress(walletAddress)} gradient={gradientOptions.nonLinearGradient1.gradient} textColor={gradientOptions.nonLinearGradient1.color} textSize={"11px"} />
            </div>
        </Boulder>
    </div>
   
  );
};

export default Wallet;