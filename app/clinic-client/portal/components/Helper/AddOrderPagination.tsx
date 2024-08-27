import React from 'react';
import { useOrderContext } from '@/components/Helper/OrderContext';
import { MEASURE_LABELS } from '@/Constants/Constants';

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
  const { model, side, scanFile, measurements } = useOrderContext();

  const isNextDisabled = () => {
    if (currentStep === 0 && !model && !side) {
      return true;
    }
    if (currentStep === 1 && !scanFile && measurements.length !== MEASURE_LABELS.length) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex justify-between mt-auto">
      <button
        onClick={onPrevious}
        className="bg-medium-gray p-2 rounded hover:bg-light-gray"
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
        <button
          onClick={onNext}
          className={`p-2 rounded ${
            isNextDisabled()
              ? 'bg-light-gray cursor-not-allowed border-2 border-gray-500'
              : 'bg-primary-light-blue text-white hover:bg-secondary-medium-blue'
          }`}
          disabled={isNextDisabled()}
        >
          Suivant
        </button>
      ) : (
        <button onClick={onOrder} className="bg-medium-green text-white p-2 rounded">
          Commander
        </button>
      )}
    </div>
  );
};

export default AddOrderPagination;
