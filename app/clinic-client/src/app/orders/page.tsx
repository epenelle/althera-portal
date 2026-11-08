'use client';

import { Order, columns } from './columns';
import CreateOrderForm from '../../components/forms/CreateOrder';
import { DataTable } from './data-table';
import { SheetTrigger } from '@/components/ui/sheet';
import { orderClient } from '@/lib/api/orderClient';
import { patientClient } from '@/lib/api/patientClient';
import { useEffect, useState } from 'react';
import type { Patient } from '@/lib/api/patientClient';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                const [loadedOrders, loadedPatients] = await Promise.all([
                    orderClient.getOrders(controller.signal),
                    patientClient.getPatients(controller.signal),
                ]);

                setOrders(loadedOrders);
                setPatients(loadedPatients);
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Failed to load orders or patients:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadData();

        return () => { controller.abort(); };
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
