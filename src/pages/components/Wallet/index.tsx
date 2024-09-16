import React, { useEffect, useState } from 'react';
import Boulder from '../boulder';
import {gradientOptions} from '../boulder/gradients';
import { shortenSuiAddress } from "../utils"
import CopyableAddress from "../copyText";
import PasswordVerification from "../passverify";
import Button from "../button";
import { suiClient } from "../provider";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decrypt } from '@metamask/browser-passworder';
import { createSuiKeypairFromPrivateKey } from "../../../crypto";
import { toast } from 'react-toastify';

const Wallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [passView, setPassView] = useState(false);

  useEffect(() => {
    async function getWalletAddress() {
       const address = await chrome.storage.local.get("suiAddress");
       setWalletAddress(address.suiAddress);
    }
    getWalletAddress();
  })

  function addAccount() {
    
  }

  function gotoPassword() {
    setPassView(true)
  }

  async function registerAccount(password: string) {
    const res = (await chrome.storage.local.get("encryptedPrivateKey")) as any;
    try {
      const privateKey = await decrypt(password, res.encryptedPrivateKey);
      const keyPair = createSuiKeypairFromPrivateKey(privateKey+"");
    } catch (error) {
      toast.error("Wrong password")
    }
    
  }

  const outerGradient = 'linear-gradient(to bottom right, #ffffff, #f0f0f0)';

  return (
    <div className='mt-5'>
        <Boulder text="" gradient={outerGradient} textColor="#ffffff" textSize="20px">
      <div className="flex flex-col items-center w-full space-y-2" style={{ padding: '12px' }}>
        <Boulder text="- Single Addresses -" gradient={gradientOptions.blueGradient.gradient} textColor={gradientOptions.blueGradient.color} textSize={"15px"} />
       {!passView && (
        <>
          <Boulder text={shortenSuiAddress(walletAddress)} gradient={gradientOptions.coolBlueGradient.gradient} textColor={gradientOptions.coolBlueGradient.color} textSize={"11px"} />  
          <CopyableAddress address={walletAddress}/> 
          <div className="flex justify-center space-x-4"> {/* Flexbox for horizontal alignment */}
        <Button text="Register account 📢" onClick={gotoPassword} />
        <Button text="Add account ➕" onClick={addAccount} />
      </div>
        </>
       )}
        {passView && (
          <>
           <PasswordVerification onVerify={registerAccount}/>
          </>
        )}
        
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