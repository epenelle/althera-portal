'use client';

import CreateOrderForm from '@/components/forms/CreateOrder';
import { SheetTrigger } from '@/components/ui/sheet';
import { patientClient } from '@/lib/api/patientClient';
import { useEffect, useState } from 'react';
import type { Patient } from '@/lib/api/patientClient';

export default function Home() {
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
                <div className="mx-auto w-4/5 p-6">
                    <h1 className="md:text-4x1 p-2 text-center text-3xl font-bold text-foreground">Accueil</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto mt-4 grid h-40 w-4/5 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* TODO : Not sure we should display a loading state here. We should only load patients when needed. */}
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <CreateOrderForm
                            patients={patients}
                            sheetTrigger={
                                <SheetTrigger className="rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90 active:bg-primary/80">
                                    Créer une commande
                                </SheetTrigger>
                            }
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

