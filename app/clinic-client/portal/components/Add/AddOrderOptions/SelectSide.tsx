import React from 'react';

interface SideSelectorProps {
  selectedSide: string;
  handleSideChange: (side: string) => void;
}

const SelectSide: React.FC<SideSelectorProps> = ({ selectedSide, handleSideChange }) => {
  return (
    <div className="flex items-center w-full pb-4 border-b-2 border-light-gray">
      <button
        className={`p-2 rounded mr-2 border-2 border-black button-transition ${
          selectedSide === 'gauche'
            ? 'bg-primary-light-blue text-white w-2/3'
            : selectedSide === 'droit'
            ? 'bg-white w-1/3'
            : 'bg-white w-1/2 mr-2'
        }`}
        onClick={() => handleSideChange('gauche')}
      >
        Gauche
      </button>
      <button
        className={`p-2 rounded mr-2 border-2 border-black button-transition ${
          selectedSide === 'droit'
            ? 'bg-primary-light-blue text-white w-2/3'
            : selectedSide === 'gauche'
            ? 'bg-white w-1/3'
            : 'bg-white w-1/2'
        }`}
        onClick={() => handleSideChange('droit')}
      >
        Droit
      </button>
    </div>
  );
};

export default SelectSide;
