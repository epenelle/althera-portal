'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { patientClient } from '@/lib/api/patientClient';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: 'Prénom obligatoire.',
    }),
    lastName: z.string().min(1, {
        message: 'Nom obligatoire.',
    }),
    email: z.string().email({
        message: 'Adresse courriel invalide.',
    }),
    phone: z.string().optional(),
});

export function CreatePatientForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await patientClient.createPatient(values);
            console.log('Patient created successfully');
            form.reset();
        } catch (error) {
            console.error('There was an error creating the patient', error);
        }
    }

    return (
        <Dialog>
            {/* Button cannot be a descendant of ... */}
            {/* <Button>  */}
                <DialogTrigger className="w-[150px] rounded-md p-2 bg-primary-dark-blue text-light-white hover:bg-secondary-dark-blue">Créer</DialogTrigger>
            {/* </Button> */}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un patient</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription></FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription></FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Courriel</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription></FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Téléphone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription></FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Ajouter</Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
