import { Order, columns } from './columns';
import CreateOrderForm from '../../components/forms/CreateOrder';
import { DataTable } from './data-table';
import { SheetTrigger } from '@/components/ui/sheet';
import { patientClient } from '@/lib/api/patientClient';

async function getOrders(): Promise<Order[]> {
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

export default async function Orders() {
    const orders = await getOrders();
    const patients = await patientClient.getPatients();

    return (
        <div>
            <header>
                <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-secondary-dark-blue">Commandes</h1>
            </header>
            <div className="mx-auto w-4/5 py-2">
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
            </div>
        </div>
    );
}
