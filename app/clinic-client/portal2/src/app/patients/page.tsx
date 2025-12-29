import { patientClient } from '@/lib/api/patientClient';
import { columns } from './columns';
import { CreatePatientForm } from './create-patient';
import { DataTable } from './data-table';

export const dynamic = 'force-dynamic';

export default async function Patients() {
    const patients = await patientClient.getPatients();

    return (
        <div>
            <header>
                <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-secondary-dark-blue">Patients</h1>
            </header>
            <div className="mx-auto w-4/5 py-2">
                <div className="flex flex-row-reverse">
                    <CreatePatientForm />
                </div>
                <DataTable columns={columns} data={patients} />
            </div>
        </div>
    );
}
