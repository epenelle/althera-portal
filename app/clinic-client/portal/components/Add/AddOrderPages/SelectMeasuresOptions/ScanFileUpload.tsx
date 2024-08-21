import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useOrderContext } from '@/components/Helper/OrderContext';

const ScanFileUpload = () => {
  const { scanFile, setScanFile, setMeasurements } = useOrderContext();

  useEffect(() => {
    setMeasurements([]);
  }, [setMeasurements]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setScanFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center ">
      <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-10 rounded-lg transition-colors duration-300 hover:border-gray-600"
      >
        <FontAwesomeIcon icon={faUpload} size="4x" className="text-gray-500 mb-4" />
        <p className="text-gray-500">Ajouter le fichier de scan</p>
      </label>
      {scanFile && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Fichier sélectionné :</h3>
          <ul className="list-disc list-inside mt-2">
            <li className="text-gray-700">{scanFile.name}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScanFileUpload;
