import React from 'react';

interface PopUpProps {
  message: string;
  variant?: 'default' | 'confirmation' | 'exit';
  onOk?: () => void;
  onCancel?: () => void;
  onValider?: () => void;
  onQuitter?: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, variant = 'default', onOk, onCancel, onValider, onQuitter }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-secondary-dark-blue bg-opacity-50 z-50">
      <div className="bg-light-white p-4 rounded-lg shadow-lg w-1/4">
        <p>{message}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {variant === 'default' && (
            <button
              onClick={onOk}
              className="px-4 py-2 bg-secondary-light-blue text-white rounded hover:bg-secondary-medium-blue"
            >
              OK
            </button>
          )}
          {variant === 'confirmation' && (
            <>
              <button
                onClick={onValider}
                className="px-4 py-2 bg-secondary-light-blue text-white rounded hover:bg-secondary-medium-blue"
              >
                Valider
              </button>
              <button onClick={onCancel} className="px-4 py-2 bg-medium-red text-white rounded hover:bg-dark-red">
                Annuler
              </button>
            </>
          )}
          {variant === 'exit' && (
            <>
              <button onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Annuler
              </button>
              <button onClick={onQuitter} className="px-4 py-2 bg-medium-red text-white rounded hover:bg-dark-red">
                Quitter
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
