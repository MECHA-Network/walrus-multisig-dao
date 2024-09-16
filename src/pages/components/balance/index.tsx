// src/SuiBalance.tsx
import React, { useEffect, useState } from 'react';
import { suiClient } from "../provider"
import { MIST_PER_SUI } from '@mysten/sui/utils';

export function getBalanceInSui(balance: string) {
    return (Number.parseInt(balance) / Number(MIST_PER_SUI))
}; 

interface SuiBalanceProps {
  address: string; // The Sui address to fetch the balance for
}

const SuiBalance: React.FC<SuiBalanceProps> = ({ address }) => {
  const [balance, setBalance] = useState<number | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const balance = (await suiClient.getBalance({owner: address}));
      setBalance(getBalanceInSui(balance.totalBalance+""));
    } catch (err) {
      setError('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [address]);

  return (
    <div className="flex flex-col items-center p-5 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h2 className="text-2xl font-bold mb-2">Sui Balance</h2>
      {loading && <p>Fetching...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {balance !== null && <p className="text-xl">{balance} SUI</p>}
    </div>
  );
};

export default SuiBalance;