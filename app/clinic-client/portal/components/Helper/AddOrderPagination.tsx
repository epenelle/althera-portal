import React from 'react';
import { useOrderContext } from '@/components/Helper/OrderContext';

type NavigationButtonsProps = {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onOrder: () => void;
};

const AddOrderPagination: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onOrder,
}) => {
  const { model, side, scanFile } = useOrderContext();

  const isNextDisabled = () => {
    console.log('currentStep :', currentStep, 'model :', model, 'side :', side);
    if (currentStep === 0 && !model && !side) {
      return true;
    }
    if (currentStep === 1 && !scanFile) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex justify-between mt-auto">
      <button
        onClick={onPrevious}
        className="bg-gray-300 p-2 rounded"
        style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
      >
        Précédent
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentStep === index ? 'black' : 'lightgray',
              margin: '0 5px',
            }}
          />
        ))}
      </div>
      {currentStep < 2 ? (
        <button onClick={onNext} disabled={isNextDisabled()} className="bg-blue-500 text-white p-2 rounded">
          Suivant
        </button>
      ) : (
        <button onClick={onOrder} className="bg-green-500 text-white p-2 rounded">
          Commander
        </button>
      )}
    </div>
  );
};

export default AddOrderPagination;
