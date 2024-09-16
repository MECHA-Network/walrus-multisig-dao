import React, { useState } from 'react';

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

  const handleCreateProposal = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmCreate = () => {
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

  const handleConfirmVote = () => {
    if (currentProposalId !== null) {
      // Increment the vote count for the selected proposal
      const updatedProposals = proposals.map((proposal) =>
        proposal.id === currentProposalId ? { ...proposal, votes: proposal.votes + 1 } : proposal
      );
      setProposals(updatedProposals);
      setCurrentProposalId(null);
    }
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