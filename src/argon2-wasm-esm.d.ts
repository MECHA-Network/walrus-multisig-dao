// src/argon2-wasm-esm.d.ts
declare module 'argon2-wasm-esm' {
    export interface Argon2Options {
      pass: string | Uint8Array;
      salt: string | Uint8Array;
      time?: number;
      mem?: number;
      hashLen?: number;
      parallelism?: number;
      type?: number; // You can define an enum for Argon2 types if needed
    }
  
    export interface Argon2Result {
      encoded: string;
      hash: Uint8Array;
      hashHex: string;
    }
  
    export function hash(options: Argon2Options): Promise<Argon2Result>;
    export function verify(options: {
      pass: string;
      encoded: string | Uint8Array;
    }): Promise<void>;
  }