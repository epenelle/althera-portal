import React from 'react';

interface MemberSelectorProps {
  selectedMember: string;
  handleButtonClick: (member: string) => void;
}

const SelectMember: React.FC<MemberSelectorProps> = ({ selectedMember, handleButtonClick }) => {
  return (
    <div className="flex items-center w-full pb-4 border-b-2 border-light-gray">
      <button
        className={`p-2 rounded mr-2 border-2 border-black button-transition ${
          selectedMember === 'poignet'
            ? 'bg-primary-light-blue text-white w-2/3'
            : selectedMember === 'doigts'
            ? 'bg-white w-1/3'
            : 'bg-white w-1/2 mr-2'
        }`}
        onClick={() => handleButtonClick('poignet')}
      >
        Poignet
      </button>
      <button
        className={`p-2 rounded mr-2 border-2 border-black button-transition ${
          selectedMember === 'doigts'
            ? 'bg-primary-light-blue text-white w-2/3'
            : selectedMember === 'poignet'
            ? 'bg-white w-1/3'
            : 'bg-white w-1/2'
        }`}
        onClick={() => handleButtonClick('doigts')}
      >
        Doigts
      </button>
    </div>
  );
};

export default SelectMember;
