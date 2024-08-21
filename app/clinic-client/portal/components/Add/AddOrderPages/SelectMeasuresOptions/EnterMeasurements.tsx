import React, { useEffect } from 'react';
import { useOrderContext } from '@/components/Helper/OrderContext';
import { MEASURE_LABELS } from '@/Constants/Constants';

const EnterMeasurements = () => {
  const { measurements, setMeasurements, setScanFile } = useOrderContext();

  useEffect(() => {
    setScanFile(null);
  }, [setScanFile]);

  const handleInputChange = (index: number, value: string) => {
    const newMeasurements = [...measurements];
    newMeasurements[index] = { label: MEASURE_LABELS[index], value };
    setMeasurements(newMeasurements);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-auto max-h-full">
      {MEASURE_LABELS.map((label, index) => (
        <div key={index} className="flex flex-col items-center">
          <label className="block text-gray-700">{label}</label>
          <input
            type="text"
            value={measurements[index]?.value || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default EnterMeasurements;
