import passworder from '@metamask/browser-passworder';
import { getStorage } from '../utls/storage';
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
