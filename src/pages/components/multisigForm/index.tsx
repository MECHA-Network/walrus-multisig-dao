import React, { useState } from 'react';

interface Props{
    userName: string
    onCreation: (
        vaultName: string,
        participants: Array<string>,
        threshold: number,
    ) => {}
}

const MultisigForm: React.FC<Props> = ({userName, onCreation}) => {
  const [multisigName, setMultisigName] = useState('');
  const [numParticipants, setNumParticipants] = useState(1);
  const [participants, setParticipants] = useState<string[]>(['']);
  const [threshold, setThreshold] = useState<number | ''>(1);

  const handleNumParticipantsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setNumParticipants(value);
    setParticipants(Array(value).fill('')); // Reset participants array
    if (value > 0) {
      setParticipants((prev) => {
        const newParticipants = [...prev];
        newParticipants[0] = ''; // Keep the first participant editable
        return newParticipants;
      });
    }
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Multisig Name:', multisigName);
    console.log('Participants:', participants);
    console.log('Threshold:', threshold);
    onCreation(multisigName, participants, parseInt(threshold+""));
    // Add your logic to create the multisig here
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-3 px-6 mx-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 w-full">
        <h2 className="text-2xl font-bold">Create Multisig</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Multisig Name</label>
          <input
            type="text"
            value={multisigName}
            onChange={(e) => setMultisigName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
          <select
            value={numParticipants}
            onChange={handleNumParticipantsChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        {participants.map((participant, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className="mr-2">@</span>
            <input
              type="text"
              value={index === 0 ? userName: participant}
              onChange={(e) => handleParticipantChange(index, e.target.value)}
              disabled={index === 0} // Disable editing for the first input
              className={`w-full p-2 border border-gray-300 rounded ${index === 0 ? 'bg-gray-200' : ''}`}
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            min={1}
            max={numParticipants}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create Multisig
        </button>
      </form>
    </div>
  );
};

export default MultisigForm;