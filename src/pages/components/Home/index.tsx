import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheck, FaWallet, FaArrowUp, FaArrowDown, FaExchangeAlt, FaUserCheck, FaLink, FaTwitter, FaDiscord } from 'react-icons/fa';
import './index.css';

export const WalletHomePage = () => {
  const [copied, setCopied] = useState(false);

  // Dummy data
  const walletName = 'Tahlil’s Wallet';
  const walletAddress = '0x1234567890ABCDEF1234567890ABCDEF12345678';
  const isConnected = true;
  const suiBalance = 1200.5;
  const usdBalance = 1500.75;
  const multisigType = '3-of-5';
  const pendingTx = ['Transaction 1: Waiting for signature', 'Transaction 2: Waiting for signature'];
  const assets = ['SUI', 'USDC', 'NFT #123'];
  const daoMemberships = ['SuiDAO', 'DeFi Club'];
  const recentDaoTransactions = ['SuiDAO voted on proposal 1', 'DeFi Club approved treasury allocation'];

  // Copy address handler
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Different gradient styles for sections
  const gradient1 = { background: 'linear-gradient(135deg, #6DD5FA, #FFFFFF)' };
  const gradient2 = { background: 'linear-gradient(135deg, #FF758C, #FF7EB3)' };
  const gradient3 = { background: 'linear-gradient(135deg, #4CA1AF, #C4E0E5)' };

  return (
    <div className="wallet-home">
      {/* Header Section */}
      <div className="wallet-header" style={gradient1}>
        <div className="avatar">
          <FaUserCheck size={50} />
        </div>
        <div className="wallet-info">
          <h2>{walletName}</h2>
          <p className="wallet-address">
            {walletAddress}
            <CopyToClipboard text={walletAddress} onCopy={handleCopy}>
              <button className="copy-btn">{copied ? <FaCheck /> : <FaCopy />}</button>
            </CopyToClipboard>
          </p>
          <p className="wallet-status">
            {isConnected ? <FaWallet color="green" /> : <FaWallet color="red" />} {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>

      {/* Balance Section */}
      <div className="wallet-balance" style={gradient2}>
        <h3>Sui Balance</h3>
        <p>{suiBalance} SUI</p>
        <p>~ ${usdBalance} USD</p>
      </div>

      {/* Multisig and Pending Transactions */}
      <div className="multisig-info" style={gradient3}>
        <h3>Multisig Type: {multisigType}</h3>
        {pendingTx.length > 0 ? (
          <div>
            <h4>Pending Transactions</h4>
            <ul>
              {pendingTx.map((tx, idx) => (
                <li key={idx}>{tx}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No pending transactions.</p>
        )}
      </div>

      {/* Assets Section */}
      <div className="assets-section" style={gradient1}>
        <h3>Your Assets</h3>
        <ul>
          {assets.map((asset, idx) => (
            <li key={idx}>{asset}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="actions-section" style={gradient2}>
        <button className="action-btn">
          <FaArrowDown /> Receive
        </button>
        <button className="action-btn">
          <FaArrowUp /> Send
        </button>
        <button className="action-btn">
          <FaExchangeAlt /> Buy
        </button>
      </div>

      {/* DAO Membership and Recent Transactions */}
      <div className="dao-section" style={gradient3}>
        <h3>Your DAOs</h3>
        <ul>
          {daoMemberships.map((dao, idx) => (
            <li key={idx}>{dao}</li>
          ))}
        </ul>
        <h4>Recent DAO Transactions</h4>
        <ul>
          {recentDaoTransactions.map((tx, idx) => (
            <li key={idx}>{tx}</li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <div className="footer" style={gradient1}>
        <a href="https://yourwebsite.com" className="banner">
          Visit our website
        </a>
        <div className="social-links">
          <a href="https://twitter.com" className="social-icon">
            <FaTwitter />
          </a>
          <a href="https://discord.com" className="social-icon">
            <FaDiscord />
          </a>
        </div>
      </div>
    </div>
  );
};

