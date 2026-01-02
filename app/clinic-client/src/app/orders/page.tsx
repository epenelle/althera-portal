'use client';

import { Order, columns } from './columns';
import CreateOrderForm from '../../components/forms/CreateOrder';
import { DataTable } from './data-table';
import { SheetTrigger } from '@/components/ui/sheet';
import { patientClient } from '@/lib/api/patientClient';
import { useEffect, useState } from 'react';
import type { Patient } from '@/lib/api/patientClient';

function getOrders(): Order[] {
    // Fetch data from your API here.
    return [
        {
            id: 'a1b2c3d4',
            number: '123',
            firstName: 'Anna',
            lastName: 'Black',
            dateCreated: new Date('2024-12-01'),
            status: 'créé',
        },
        {
            id: 'e5f6g7h8',
            number: '456',
            firstName: 'Noah',
            lastName: 'Taylor',
            dateCreated: new Date('2024-12-02'),
            status: 'en cours',
        },
        {
            id: 'i9j0k1l2',
            number: '789',
            firstName: 'Olivia',
            lastName: 'Smith',
            dateCreated: new Date('2024-12-03'),
            status: 'terminé',
        },
        {
            id: 'm3n4o5p6',
            number: '012',
            firstName: 'Liam',
            lastName: 'Johnson',
            dateCreated: new Date('2024-12-04'),
            status: 'annulé',
        },
    ];
}

export default function Orders() {
    const [orders] = useState<Order[]>(getOrders());
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        patientClient.getPatients()
            .then(data => {
                setPatients(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load patients:', err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <header>
                <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-secondary-dark-blue">Commandes</h1>
            </header>
            <div className="mx-auto w-4/5 py-2">
                {isLoading ? (
                    <div className="text-center p-4">Loading patients...</div>
                ) : (
                    <>
                        <div className="flex flex-row-reverse">
                            <CreateOrderForm
                                patients={patients}
                                sheetTrigger={
                                    <SheetTrigger className="w-[150px] rounded-md p-2 bg-primary-dark-blue text-light-white hover:bg-secondary-dark-blue">
                                        Créer
                                    </SheetTrigger>
                                }
                            />
                        </div>
                        <DataTable columns={columns} data={orders} />
                    </>
                )}
            </div>
        </div>
    );
}
