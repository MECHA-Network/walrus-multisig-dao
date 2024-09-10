import passworder from '@metamask/browser-passworder';
import cryptoRandomString from 'crypto-random-string';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

import * as argon2 from 'argon2-browser';
/**
 * Encrypts data using a user-provided password.
 *
 * @param password - The password used to encrypt data.
 * @param data - The data to be encrypted.
 * @returns A promise resolving to the encrypted data.
 */
export async function encryptAndStoreData(password: string, data: any){
  try {
    // const encryptedData = await passworder.encrypt(password, data);
    console.log("Setting storage:");
    chrome.storage.local.set({ encryptedPrivateKey: "test key" });
    // chrome.storage.local.set({ data }, () => {
    //   console.log("Data stored successfully");
    //   // Clear the data from memory
    //   data = null;
    // });
    
    // return JSON.stringify(encryptedData);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

/**
 * Decrypts data using a user-provided password.
 *
 * @param password - The password used to decrypt data.
 * @param encryptedData - The encrypted data to be decrypted.
 * @returns A promise resolving to the decrypted data.
 */
export async function decryptAndGetData(password: string, encryptedData: string): Promise<any> {
  try {
    const storedData = await chrome.storage.local.get("encryptedPrivateKey");
    console.log({storedData});
    return storedData
    // const parsedEncryptedData = JSON.parse(encryptedData);
    // const decryptedData = await passworder.decrypt(password, parsedEncryptedData);
    // return decryptedData;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export async function checkAccountCreated(): Promise<boolean> {
  const storedData = await chrome.storage.local.get("accountCreated");
  return storedData.accountCreated === true;
}

export async function saveSuiKeypairAndAddress(password: string){
  const secretKey = await hashArgon2(password, cryptoRandomString({length: 16, type: 'base64'}))
  let bytes32Key = Buffer.from(secretKey, "hex");
  const keypair = Ed25519Keypair.fromSecretKey(bytes32Key);
  const sui_address = keypair.getPublicKey().toSuiAddress();
}

export async function hashArgon2(password: string, salt: string): Promise<string> {
    const hashResult = await argon2.hash({
      pass: password,
      salt: salt,
      hashLen: 32
    });
    console.log('Hash:', hashResult.encoded);
    console.log('Hash Hex:', hashResult.hashHex);
    return hashResult.encoded;
}


