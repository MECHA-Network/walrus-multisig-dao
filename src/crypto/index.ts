import { encrypt, decrypt } from '@metamask/browser-passworder';
import cryptoRandomString from 'crypto-random-string';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import argon2 from 'argon2-wasm-esm';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

export function uint8ArrayToBase64(array: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, array as unknown as number[]));
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}


// Utility to convert Ed25519 to X25519
export function ed25519ToX25519(publicKey: Uint8Array): Uint8Array {
    // X25519 uses the Curve25519 key pair, so we convert
    return nacl.scalarMult.base(publicKey);
}

// Encrypting with the X25519 public key
export function encryptMessage(message: string, recipientPublicKey: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array } {
    const nonce = nacl.randomBytes(24); // Generate a nonce
    const messageBytes = naclUtil.decodeUTF8(message);

    // Encrypt the message using X25519
    const encrypted = nacl.box(messageBytes, nonce, recipientPublicKey, nacl.randomBytes(32));

    return { encrypted, nonce };
}

// Decrypting with the X25519 private key
export function decryptMessage(encrypted: Uint8Array, nonce: Uint8Array, recipientPrivateKey: Uint8Array, senderPublicKey: Uint8Array): string {
    const decrypted = nacl.box.open(encrypted, nonce, senderPublicKey, recipientPrivateKey);
    
    if (!decrypted) {
        throw new Error('Decryption failed');
    }

    return naclUtil.encodeUTF8(decrypted);
}


export function createSuiKeypairFromPrivateKey(privateKeyString: string): Ed25519Keypair {
  if (!privateKeyString.startsWith('suiprivkey')) {
    throw new Error('Private key must start with "suiprivkey"');
  }

  const parsed = decodeSuiPrivateKey(privateKeyString);

  // Create and return the keypair
  return Ed25519Keypair.fromSecretKey(parsed.secretKey);
}

/**
 * Encrypts data using a user-provided password.
 *
 * @param password - The password used to encrypt data.
 * @param data - The data to be encrypted.
 * @returns A promise resolving to the encrypted data.
 */
export async function encryptAndStoreData(password: string, data: any){
  try {
    let encryptedData = (await encrypt(password, data)) as string || null;
    chrome.storage.local.set({ encryptedPrivateKey: encryptedData }, () => {
      encryptedData = null;
    });
  } catch (error) {
    console.error('Encryption failed:', error);
  }
}

/**
 * Decrypts data using a user-provided password.
 *
 * @param password - The password used to decrypt data.
 * @param encryptedData - The encrypted data to be decrypted.
 * @returns A promise resolving to the decrypted data.
 */
export async function decryptAndGetData(password: string){
  try {
    const res = (await chrome.storage.local.get("encryptedPrivateKey")) as any;
    // const parsedEncryptedData = JSON.parse(encryptedData);
    await decrypt(password, res.encryptedPrivateKey);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export async function checkAccountCreated(): Promise<boolean> {
  const storedData = await chrome.storage.local.get("accountCreated");
  return storedData.accountCreated;
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


