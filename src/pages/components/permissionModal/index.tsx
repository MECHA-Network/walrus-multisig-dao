import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PermissionModalProps {
  text: string,
  isOpen: boolean; // To control the visibility of the modal
  onClose: () => void; // Function to close the modal
  onConfirm: (userName: string) => void; // Function to handle permission confirmation
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose, onConfirm, text }) => {
  const [userName, setUserName] = useState('');
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Permission Required</h2>
        <p className="mb-4">{text}</p>
        <input
          type="text"
          placeholder="Enter your user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.success('Permission granted!');
              onConfirm(userName);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PermissionModal;