import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../provider";
import { decrypt } from '@metamask/browser-passworder';
import { createSuiKeypairFromPrivateKey } from '@src/crypto';
import { Ed25519Keypair, Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";

// Proposal type definition
interface Proposal {
  id: number;
  name: string;
  creator: string;
  createdAt: Date;
  endDate: Date;
  votes: number;
  minThreshold: number;
}

const DAOComponent: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalName, setProposalName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [minThreshold, setMinThreshold] = useState<number>(1);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(false);
  const [currentProposalId, setCurrentProposalId] = useState<number | null>(null);
  const [currentKeyPair, setCurrentKeyPair] = useState({} as Ed25519Keypair);

  const handleCreateProposal = () => {
    setShowConfirmPopup(true);
  };

  useEffect(() => {
    async function init() {
        const res = (await chrome.storage.local.get("encryptedPrivateKey")) as any;
      
          const privateKey = await decrypt("123321", res.encryptedPrivateKey);
          const keyPair = createSuiKeypairFromPrivateKey(privateKey + "");
          setCurrentKeyPair(keyPair);
    }
    init();  
  })

  function storeBlob() {
    const element = window.document.getElementById("id_name");
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    const inputFile = fileInput?.files?.[0];
    const numEpochs = 500;
    const publisherUrlInput = "";

    if (!inputFile) {
      throw new Error("Missing required inputs");
    }

    // Submit a PUT request with the file's content as the body to the /v1/store endpoint.
    return fetch(`${"https://publisher-devnet.walrus.space"}/v1/store?epochs=${numEpochs}`, {
        method: "PUT",
        body: inputFile,
    }).then((response) => {
        if (response.status === 200) {
            // Parse successful responses as JSON, and return it along with the
            // mime type from the the file input element.
            return response.json().then((info) => {
                console.log(info);
                toast.success("File uploaded to Walrus.")
                return { info: info, media_type: inputFile.type };
            });
        } else {
            throw new Error("Something went wrong when storing the blob!");
        }
    })
}

  const handleConfirmCreate = async () => {
    // const storageInfo = await storeBlob()

    // if (storageInfo && storageInfo.info.newlyCreated && storageInfo.info.newlyCreated.blobObject) {
    //   toast.success(`Blob ID is ${storageInfo.info.newlyCreated.blobObject}`)
    // }
    // else if (storageInfo && storageInfo.info && storageInfo.info.alreadyCertified.blobId) {
    //     toast.success(`Blob ID is ${storageInfo.info.alreadyCertified.blobId}`)
    //   } 
    // else {
    //   toast.error("Failed to get Blob ID")
    // }

    if (proposalName && file) {
      const newProposal: Proposal = {
        id: proposals.length + 1,
        name: proposalName,
        creator: 'Your Name', // Replace with actual user name
        createdAt: new Date(),
        endDate,
        votes: 0,
        minThreshold,
      };
      setProposals([...proposals, newProposal]);
      resetForm();
    }
    try {
        const trx = new Transaction();
        
        trx.moveCall({
            target: `0x56a6f42c20f5422292c3ce30dd55746492e75360ec41ade0074290c765fe4bf9::governance::create_proposal`,
            arguments: [
                trx.pure.string('Increase Staking Rewards'),
                trx.object('0x4c75af55472b7cf83ded0d18d7b2c6cbdfc3b0a30a20c346e9ed72441de26a45'),
                trx.object('0x510545dc37da1fb3459d79f260a457a2530df381f062b6d94ea8fc4c77cd3f05'),
                trx.pure.u64(100),
                trx.object('0xb8610294c2f92b9fa50d9253d86e05c3418d60bb4a06a1d3c1c074f15edbbdfd'),
            ]
        });

    const res = await suiClient.signAndExecuteTransaction(
            {
                signer: currentKeyPair,
                transaction: trx,
            },
           
        );

        toast.success( <div>
            <span>Transaction was successful ✅ </span>
            <a
              href={`https://testnet.suivision.xyz/txblock/${res.digest}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Tx Link
            </a>
          </div>)
    } catch (error) {
        // toast.error(error+"");
    }
        
    toast.success("Proposal added ✅")
    setShowConfirmPopup(false);
  };

  const resetForm = () => {
    setProposalName('');
    setFile(null);
    setMinThreshold(1);
    setEndDate(new Date());
  };

  const handleVote = (proposalId: number) => {
    setCurrentProposalId(proposalId);
    setShowVoteConfirmation(true);
  };

  const handleConfirmVote = async () => {
    if (currentProposalId !== null) {
      // Increment the vote count for the selected proposal
      const updatedProposals = proposals.map((proposal) =>
        proposal.id === currentProposalId ? { ...proposal, votes: proposal.votes + 1 } : proposal
      );
      setProposals(updatedProposals);
      setCurrentProposalId(null);
    }
     try {
        const trx = new Transaction();
        trx.moveCall({
            target: `0x56a6f42c20f5422292c3ce30dd55746492e75360ec41ade0074290c765fe4bf9::governance::vote_proposal`,
            arguments: [
                trx.object('0x510545dc37da1fb3459d79f260a457a2530df381f062b6d94ea8fc4c77cd3f05'),
                trx.object('0xb6f03288902c189b1fc4694dbc6fd09c07fb55c47b6e1ca977e46bca9597a164'),
                trx.object('0xb8610294c2f92b9fa50d9253d86e05c3418d60bb4a06a1d3c1c074f15edbbdfd'),
                trx.object('0x0000000000000000000000000000000000000000000000000000000000000006')
            ]
        });

       const res = await suiClient.signAndExecuteTransaction(
            {
                signer: currentKeyPair,
                transaction: trx,
            },
        );
        toast.success( <div>
            <span>Transaction was successful ✅ </span>
            <a
              href={`https://testnet.suivision.xyz/txblock/${res.digest}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Tx Link
            </a>
          </div>)
     } catch (error) {
        
     }
    toast.success("Vote casted ✅")
    setShowVoteConfirmation(false);
  };

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">DAO Proposals</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Proposal Name"
          value={proposalName}
          onChange={(e) => setProposalName(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="file"
          id="file-input"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="mb-2"
        />
        <label htmlFor="minThreshold" className="block mb-1">
          Minimum threshold limit
        </label>
        <input
          id="minThreshold"
          type="number"
          min="1"
          value={minThreshold}
          onChange={(e) => setMinThreshold(Number(e.target.value))}
          placeholder="Minimum Threshold"
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="date"
          value={endDate.toISOString().slice(0, 10)}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <button
          onClick={handleCreateProposal}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Proposal
        </button>
      </div>

      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2>Confirm Proposal Creation</h2>
            <p>Are you sure you want to create this proposal?</p>
            <button onClick={handleConfirmCreate} className="bg-green-500 text-white p-2 rounded mr-2">
              Confirm
            </button>
            <button onClick={() => setShowConfirmPopup(false)} className="bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showVoteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <h2>Confirm Vote</h2>
            <p>Are you sure you want to cast your vote?</p>
            <button onClick={handleConfirmVote} className="bg-green-500 text-white p-2 rounded mr-2">
              Confirm
            </button>
            <button onClick={() => setShowVoteConfirmation(false)} className="bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mt-5">Proposals List</h2>
      <ul className="list-disc pl-5">
        {proposals.map((proposal) => (
          <li key={proposal.id} className="mb-2">
            {proposal.name} - Created by {proposal.creator} on {proposal.createdAt.toLocaleString()} - Votes: {proposal.votes} - Minimum Threshold: {proposal.minThreshold} - End Date: {proposal.endDate.toLocaleString()}
            <button
              onClick={() => handleVote(proposal.id)}
              className="ml-4 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DAOComponent;