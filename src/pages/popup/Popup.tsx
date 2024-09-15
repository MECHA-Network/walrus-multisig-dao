import logo from '@assets/img/logo.svg';


export default function Popup(): JSX.Element {
  console.log(chrome.storage);
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
     <h1>Sui Wallet</h1>
        <button id="connect">Connect to Sui</button>
        <div id="wallet-info"></div>
    </div>
  );
}
