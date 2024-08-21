import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

const fingerOptions = [
  { value: 'thumb', label: 'Pouce' },
  { value: 'index', label: 'Index' },
  { value: 'middle', label: 'Majeur' },
  { value: 'ring', label: 'Annulaire' },
  { value: 'pinky', label: 'Auriculaire' },
];

type FingerOption = {
  value: string;
  label: string;
};

interface SelectFingerProps {
  selectedFinger: string;
  handleFingerChange: (finger: string) => void;
}

const SelectFinger: React.FC<SelectFingerProps> = ({ selectedFinger, handleFingerChange }) => {
  const handleChange = (selectedOption: SingleValue<FingerOption>) => {
    handleFingerChange(selectedOption?.value || '');
  };

  return (
    <div className="flex justify-center items-center">
      <Select
        className="ml-4 w-3/5"
        options={fingerOptions}
        value={fingerOptions.find((option) => option.value === selectedFinger) || null}
        onChange={handleChange}
        placeholder="Sélectionner un doigt"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default SelectFinger;
