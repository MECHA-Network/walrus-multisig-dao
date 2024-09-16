import React, { useEffect, useState } from "react";

import Boulder from "../boulder";
import { gradientOptions } from "../boulder/gradients";
import { Transaction } from "@mysten/sui/transactions";
import { CONTRACT_AND_OBJECT_ADDRESSES } from "../../panel/const";
import { shortenSuiAddress } from "../utils";
import CopyableAddress from "../copyText";
import PasswordVerification from "../passverify";
import Button from "../button";
import MultisigForm from "../multisigForm";
import PermissionModal from "../permissionModal";
import SuiBalance from "../balance";
import { suiClient } from "../provider";
import { Ed25519Keypair, Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { decrypt } from "@metamask/browser-passworder";
import {
  createSuiKeypairFromPrivateKey,
  encryptMessage,
} from "../../../crypto";
import { toast } from "react-toastify";
import { uint8ArrayToBase64, base64ToUint8Array } from "../../../crypto";

const Wallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [passView, setPassView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [addMultiSig, setAddMultiSig] = useState(false);

  const [pubKey, setPubkey] = useState("");
  const [userName, setUserName] = useState("");
  const [currentKeyPair, setCurrentKeyPair] = useState({} as Ed25519Keypair);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function uint8ArrayToSuiAddress(uint8Array: Uint8Array) {
    // Create an Ed25519PublicKey instance from the Uint8Array
    const publicKey = Ed25519PublicKey.fromBytes(uint8Array);
    
    // Convert the public key to a Sui address
    return publicKey.toSuiAddress();
}

  const handleMultiSigCreation = async (
    vaultName: string,
    participants: Array<string>,
    threshold: number
  ) => {
    toast.success(vaultName + " " + participants.length + " " + threshold);
    const publicKeys = [];
    try {
      for (let index = 1; index < participants.length; index++) {
        const participant = participants[index];
        toast.success(participant);
        const trx = new Transaction();
        trx.moveCall({
          target: `${CONTRACT_AND_OBJECT_ADDRESSES.PACKAGE_ADDRESS}::protocol::get_public_key`,
          arguments: [
            trx.object(
              CONTRACT_AND_OBJECT_ADDRESSES.USER_REGISTRY_OBJ
            ),
            trx.pure.string(participant),
          ],
        });
        const res = await suiClient.devInspectTransactionBlock({
            sender: walletAddress,
            transactionBlock: trx
        }) 
        const publicKey = res.results;
        const byteArray = res.results?.[0]?.returnValues?.[0]?.[0]
        toast.success("Notified other multisig members ✅");
        publicKeys.push(publicKey);
      }  
    } catch (error) {
      toast.error(error+"")
    }
    
    
    // const blob = new Blob([], { type: 'text/plain' });
    // const basePublisherUrl = "https://publisher-devnet.walrus.space";
    // // Create a new file object and set it to the file input
    // const file = new File([blob], 'sentence.txt', { type: 'text/plain' });
    // // Submit a PUT request with the file's content as the body to the /v1/store endpoint.
    // return fetch(`${basePublisherUrl}/v1/store?epochs=${1}`, {
    //     method: "PUT",
    //     body: file,
    // }).then((response) => {
    //     if (response.status === 200) {
    //         // Parse successful responses as JSON, and return it along with the
    //         // mime type from the the file input element.
    //         return response.json().then((info) => {
    //             console.log(info);
    
    //             return { info: info, media_type: file.type };
    //         });
    //     } else {
    //         throw new Error("Something went wrong when storing the blob!");
    //     }
    // })
  };

  const handleConfirm = async (givenUserName: string) => {
    console.log("User granted permission");
    const trx = new Transaction();
    trx.moveCall({
      target: `${CONTRACT_AND_OBJECT_ADDRESSES.PACKAGE_ADDRESS}::protocol::add_user`,
      arguments: [
        trx.object(
          CONTRACT_AND_OBJECT_ADDRESSES.USER_REGISTRY_OBJ+""
        ),
        trx.pure.string(givenUserName),
        trx.pure.string(pubKey),
      ],
    });
    const res = await suiClient.signAndExecuteTransaction({
      signer: currentKeyPair,
      transaction: trx,
    });
    if (res.errors) {
      toast.error("Transaction failed ❌");
    } else {
      toast.success(
        <div>
          <span>Transaction was successful ✅ </span>
          <a
            href={`https://testnet.suivision.xyz/txblock/${res.digest}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Tx Link
          </a>
        </div>
      );
      await chrome.storage.local.set({ userName: givenUserName });
    }
    setTimeout(() => {
      setModalOpen(false);
    }, 5000);
  };

  useEffect(() => {
    async function getWalletAddress() {
      const address = await chrome.storage.local.get("suiAddress");
      setWalletAddress(address.suiAddress);
      //  const trx = new Transaction();
      //  suiClient.devInspectTransactionBlock({
      //   sender:address.suiAddress,
      //   transactionBlock: trx
      // })
      const res = await chrome.storage.local.get("userName");
      // const res = await chrome.storage.local.set({"userName": ""});
      setUserName(res.userName);
    }
    getWalletAddress();
  });

  function addAccount() {}

  function gotoPassword() {
    setPassView(true);
  }

  function addMultisigForm() {
    setAddMultiSig(true);
  }

  async function registerAccount(password: string) {
    const res = (await chrome.storage.local.get("encryptedPrivateKey")) as any;
    try {
      const privateKey = await decrypt(password, res.encryptedPrivateKey);
      const keyPair = createSuiKeypairFromPrivateKey(privateKey + "");
      setCurrentKeyPair(keyPair);
      toast.success("Password correct!");
      const strForm = uint8ArrayToBase64(keyPair.getPublicKey().toRawBytes());
      setPubkey(strForm);
      setTimeout(() => {
        setPassView(false);
        handleOpenModal();
      }, 5000);
    } catch (error) {
      toast.error("Wrong password");
    }
  }

  const outerGradient = "linear-gradient(to bottom right, #ffffff, #f0f0f0)";

  return (
    <div className="mt-5">
      <Boulder
        text=""
        gradient={outerGradient}
        textColor="#ffffff"
        textSize="20px"
      >
        <div
          className="flex flex-col items-center w-full space-y-2"
          style={{ padding: "12px" }}
        >
          <Boulder
            text="- Single Addresses -"
            gradient={gradientOptions.blueGradient.gradient}
            textColor={gradientOptions.blueGradient.color}
            textSize={"15px"}
          />
          <Boulder
            text=""
            gradient={gradientOptions.earthyGradient.gradient}
            textColor="#ffffff"
            textSize="20px"
          >
            <div className="flex flex-col justify-content item-center p-3">
              {!passView && (
                <>
                  <Boulder
                    text={shortenSuiAddress(walletAddress)}
                    gradient={gradientOptions.coolBlueGradient.gradient}
                    textColor={gradientOptions.coolBlueGradient.color}
                    textSize={"17px"}
                  />
                  <div className="pb-3 pt-1">
                    <CopyableAddress address={walletAddress} />
                  </div>
                  <div className="flex justify-center space-x-4 py-3">
                    {" "}
                    {/* Flexbox for horizontal alignment */}
                    {userName.length === 0 ? (
                      <Button
                        text="Register account 📢"
                        onClick={gotoPassword}
                      />
                    ) : (
                      <div
                        style={{
                          background: gradientOptions.purpleGradient.gradient,
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          boxShadow:
                            "5px 5px 15px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.2)",
                          maxWidth: "fit-content",
                          padding: "6px 12px",
                        }}
                        className="text-white"
                      >
                        Username: <h2>{userName}</h2>
                      </div>
                    )}
                    <Button text="Add account ➕" onClick={addAccount} />
                  </div>
                  {walletAddress !== "" && (
                    <SuiBalance address={walletAddress} />
                  )}
                </>
              )}
              {passView && (
                <>
                  <PasswordVerification onVerify={registerAccount} />
                </>
              )}
            </div>
          </Boulder>
        </div>
      </Boulder>

      <br />
      <Boulder
        text=""
        gradient={outerGradient}
        textColor="#ffffff"
        textSize="20px"
      >
        <div className="flex flex-col items-center space-y-2">
          <Boulder
            text="- Multisig Addresses -"
            gradient={gradientOptions.warmCoralGradient.gradient}
            textColor={gradientOptions.warmCoralGradient.color}
            textSize={"15px"}
          />

          <Boulder
            text=""
            gradient={gradientOptions.earthyGradient.gradient}
            textColor="#ffffff"
            textSize="20px"
          >
            {addMultiSig ? (
              <MultisigForm
                userName={userName}
                onCreation={handleMultiSigCreation}
              />
            ) : (
              <div className="flex flex-col justify-content item-center m-3">
                <Boulder
                  text={shortenSuiAddress(walletAddress)}
                  gradient={gradientOptions.nonLinearGradient1.gradient}
                  textColor={gradientOptions.nonLinearGradient1.color}
                  textSize={"11px"}
                />
                <Button text="Create multisig ➕" onClick={addMultisigForm} />
              </div>
            )}
          </Boulder>
        </div>
      </Boulder>
      <PermissionModal
        text={
          "Register your address to be able to part of multisig vault?\n" +
          "From Address: " +
          shortenSuiAddress(walletAddress)
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Wallet;
