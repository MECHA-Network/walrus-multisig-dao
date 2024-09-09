export const generateMasterKey = async (password: string) => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return derivedKey;
} 

export const encryptData = async (masterKey: CryptoKey, data: any) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      masterKey,
      encoder.encode(data)
    );
    return new Uint8Array(encrypted);
  }