import React from 'react';

interface PopUpProps {
  message: string;
  type?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onValider?: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, type = false, onOk, onCancel, onValider }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/4">
        <p>{message}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {type ? (
            <>
              <button onClick={onValider} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Valider</button>
              <button onClick={onCancel} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">Annuler</button>
            </>
          ) : (
            <button onClick={onOk} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">OK</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;