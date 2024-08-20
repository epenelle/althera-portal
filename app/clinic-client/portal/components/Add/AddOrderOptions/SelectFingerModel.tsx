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

const SelectFingerModel = () => {
  const [selectedFingerModel, setSelectedFingerModel] = useState<SingleValue<FingerModelOption>>(null);

  const handleFingerChange = (selectedOption: SingleValue<FingerModelOption>) => {
    setSelectedFingerModel(selectedOption);
  };

  return (
    <div className="flex justify-center items-center">
      <Select
        className="ml-4 w-3/5"
        options={fingerModelOptions}
        value={selectedFingerModel}
        onChange={handleFingerChange}
        placeholder="Sélectionner un modèle"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default SelectFingerModel;
