import React from 'react';
import '@pages/options/Options.css';

export default function Options(): JSX.Element {
  return <div className="container">chrome: {chrome.storage+""}</div>;
}
