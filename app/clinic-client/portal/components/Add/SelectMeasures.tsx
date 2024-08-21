import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useOrderContext } from '@/components/Helper/OrderContext';

const SelectMeasures = () => {
  const { scanFile, setScanFile } = useOrderContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setScanFile(files);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center border-2 border-light-gray rounded-lg">
      <input type="file" id="file-upload" onChange={handleFileChange} multiple className="hidden" />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-10 rounded-lg transition-colors duration-300 hover:border-gray-600"
      >
        <FontAwesomeIcon icon={faUpload} size="4x" className="text-gray-500 mb-4" />
        <p className="text-gray-500">Ajouter le fichier de scan</p>
      </label>
      {scanFile && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Fichiers sélectionnés :</h3>
          <ul className="list-disc list-inside mt-2">
            {Array.from(scanFile).map((file, index) => (
              <li key={index} className="text-gray-700">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectMeasures;
