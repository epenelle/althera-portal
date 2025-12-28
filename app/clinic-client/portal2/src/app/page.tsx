import CreateOrderForm from '@/components/forms/CreateOrder';
import { SheetTrigger } from '@/components/ui/sheet';

export default function Home() {
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

