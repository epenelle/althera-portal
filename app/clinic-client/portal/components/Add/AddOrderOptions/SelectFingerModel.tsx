import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

const fingerModelOptions = [
  { value: 'swonNeck', label: 'Swon Neck' },
  { value: 'boutonniere', label: 'Boutonnière' },
  { value: 'malletFinger', label: 'Mallet Finger' },
];

type FingerModelOption = {
  value: string;
  label: string;
};

interface SelectFingerModelProps {
  selectedModel: string;
  handleModelChange: (model: string) => void;
}

const SelectFingerModel: React.FC<SelectFingerModelProps> = ({ selectedModel, handleModelChange }) => {
  const handleFingerChange = (selectedOption: SingleValue<FingerModelOption>) => {
    handleModelChange(selectedOption?.value || '');
  };

  return (
    <div className="flex justify-center items-center">
      <Select
        className="ml-4 w-3/5"
        options={fingerModelOptions}
        value={fingerModelOptions.find((option) => option.value === selectedModel) || null}
        onChange={handleFingerChange}
        placeholder="Sélectionner un doigt"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default SelectFingerModel;
