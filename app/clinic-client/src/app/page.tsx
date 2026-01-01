import CreateOrderForm from '@/components/forms/CreateOrder';
import { SheetTrigger } from '@/components/ui/sheet';
import { patientClient } from '@/lib/api/patientClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const patients = await patientClient.getPatients();

    return (
        <div>
            <header>
                <div className="mx-auto w-4/5 p-6">
                    <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-secondary-dark-blue">Accueil</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto mt-4 grid h-40 w-4/5 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <CreateOrderForm
                        // TODO: Not convinced by asking for patients here. Perhaps the component should fetch them itself ?
                        patients={patients}
                        sheetTrigger={
                            <SheetTrigger className="rounded-xl bg-primary-dark-blue font-bold text-light-white hover:bg-secondary-dark-blue">
                                Créer une commande
                            </SheetTrigger>
                        }
                    />
                </div>
            </main>
        </div>
    );
}

