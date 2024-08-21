import React from 'react';
import { useOrderContext } from '@/components/Helper/OrderContext';

const Confirm = () => {
  const { patient, member, finger, side, model, scanFile, measurements } = useOrderContext();

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold underline">Patient:</span> {patient?.firstName} {patient?.lastName}
        </p>
        <p className="text-lg">
          <span className="font-semibold underline">Membre concerné:</span> {member}
        </p>
        {member === 'poignet' && (
          <p className="text-lg">
            <span className="font-semibold underline">Poignet :</span> {side}
          </p>
        )}
        {member === 'doigts' && (
          <>
            <p className="text-lg">
              <span className="font-semibold underline">Doigt :</span> {finger}
            </p>
            <p className="text-lg">
              <span className="font-semibold underline">Modèle :</span> {model}
            </p>
          </>
        )}
        {!scanFile ? (
          <div className="text-lg">
            <span className="font-semibold underline">Mesures :</span>
            {measurements.map((measurement, index) => (
              <p key={index}>
                <span className="font-semibold">{measurement.label}</span> - {measurement.value}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-lg">
            <span className="font-semibold underline">Scan à envoyer :</span> {scanFile.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Confirm;
