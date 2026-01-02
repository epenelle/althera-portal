'use client';

import { patientClient } from '@/lib/api/patientClient';
import { columns } from './columns';
import { CreatePatientForm } from './create-patient';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import type { Patient } from '@/lib/api/patientClient';

export default function Patients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        patientClient.getPatients()
            .then(data => {
                setPatients(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <header>
                <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-secondary-dark-blue">Patients</h1>
            </header>
            <div className="mx-auto w-4/5 py-2">
                <div className="flex flex-row-reverse">
                    <CreatePatientForm />
                </div>
                {isLoading && <div className="text-center p-4">Loading patients...</div>}
                {error && <div className="text-center p-4 text-red-600">Error: {error}</div>}
                {!isLoading && !error && <DataTable columns={columns} data={patients} />}
            </div>
        </div>
    );
}
