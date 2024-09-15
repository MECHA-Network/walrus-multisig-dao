import { registerWallet } from '@mysten/wallet-standard';
import { WalrusMultiSigWallet } from './walletStd';

try {
  registerWallet(new WalrusMultiSigWallet());
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}