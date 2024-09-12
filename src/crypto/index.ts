import { encrypt } from '@metamask/browser-passworder';
import cryptoRandomString from 'crypto-random-string';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import argon2 from 'argon2-wasm-esm';

/**
 * Encrypts data using a user-provided password.
 *
 * @param password - The password used to encrypt data.
 * @param data - The data to be encrypted.
 * @returns A promise resolving to the encrypted data.
 */
export async function encryptAndStoreData(password: string, data: any){
  try {
    let encryptedData = await encrypt(password, data) as string || null;
    console.log({encryptedData});
    
    chrome.storage.local.set({ encryptedPrivateKey: encryptedData }, () => {
      encryptedData = null;
    });
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
export async function decryptAndGetData(password: string): Promise<any> {
  try {
    const encryptedPrivateKey = (await chrome.storage.local.get("encryptedPrivateKey")) as any;
    // const parsedEncryptedData = JSON.parse(encryptedData);
    const decryptedData = await passworder.decrypt(password, encryptedPrivateKey);
    return decryptedData;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export async function checkAccountCreated(): Promise<boolean> {
  const storedData = await chrome.storage.local.get("accountCreated");
  return storedData.accountCreated === true;
}

export async function getSuiKeyAndAddress(password: string): Promise<{ scrKey: string; suiAddrs: string }>{
  // const secretKey = await hashArgon2(password, cryptoRandomString({length: 16, type: 'base64'}))
  // let bytes32Key = Buffer.from(password, "hex");

  const encoder = new TextEncoder();
  const bytes32Key = encoder.encode(password+cryptoRandomString({length: 16, type: 'base64'}));
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes32Key);
  const keypair = Ed25519Keypair.fromSecretKey(new Uint8Array(hashBuffer));
  const suiAddress = keypair.getPublicKey().toSuiAddress();
  return {scrKey: keypair.getSecretKey(), suiAddrs: suiAddress}
}

async function hashArgon2(password: string, salt: string): Promise<string> {
    const hashResult = await argon2.hash({
      pass: password,
      salt: salt,
      hashLen: 32,
    });
    return hashResult.encoded;

}


