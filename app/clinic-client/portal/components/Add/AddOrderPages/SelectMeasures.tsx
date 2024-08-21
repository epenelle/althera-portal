import React, { useState } from 'react';
import ScanFileUpload from './SelectMeasuresOptions/ScanFileUpload';
import EnterMeasurements from './SelectMeasuresOptions/EnterMeasurements';

const SelectMeasures = () => {
  const [selectedOption, setSelectedOption] = useState<'scan' | 'measure'>('scan');

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex items-center w-full mb-4">
        <button
          className={`p-2 rounded mr-2 border-2 border-black button-transition ${
            selectedOption === 'scan'
              ? 'bg-primary-light-blue text-white w-2/3'
              : selectedOption === 'measure'
              ? 'bg-white w-1/3'
              : 'bg-white w-1/2 mr-2'
          }`}
          onClick={() => setSelectedOption('scan')}
        >
          Ajouter un scan
        </button>
        <button
          className={`p-2 rounded mr-2 border-2 border-black button-transition ${
            selectedOption === 'measure'
              ? 'bg-primary-light-blue text-white w-2/3'
              : selectedOption === 'scan'
              ? 'bg-white w-1/3'
              : 'bg-white w-1/2'
          }`}
          onClick={() => setSelectedOption('measure')}
        >
          Rentrer les mesures
        </button>
      </div>
      <div className="border-2 w-full h-full border-light-gray rounded-lg p-10 flex-grow overflow-auto max-h-full">
        {selectedOption === 'scan' ? <ScanFileUpload /> : <EnterMeasurements />}
      </div>
    </div>
  );
};

export default SelectMeasures;
