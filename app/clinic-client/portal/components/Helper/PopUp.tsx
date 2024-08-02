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
    <div className="fixed inset-0 flex items-center justify-center bg-secondary-dark-blue bg-opacity-50 z-50">
      <div className="bg-light-white p-4 rounded-lg shadow-lg w-1/4">
        <p>{message}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {type ? (
            <>
              <button onClick={onValider} className="px-4 py-2 bg-secondary-light-blue text-white rounded hover:bg-secondary-medium-blue">Valider</button>
              <button onClick={onCancel} className="px-4 py-2 bg-medium-red text-white rounded hover:bg-dark-red">Annuler</button>
            </>
          ) : (
            <button onClick={onOk} className="px-4 py-2 bg-secondary-light-blue text-white rounded hover:bg-secondary-medium-blue">OK</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;