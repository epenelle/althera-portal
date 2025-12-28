'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReactElement, useEffect, useState } from 'react';
import { Patient } from '@/lib/api/patientClient';
// import { fileClient } from '@/lib/api/fileClient';
// import { AnonymousCredential, AnonymousCredentialPolicy, BlobServiceClient, BlockBlobClient, RequestPolicy, RequestPolicyOptions, StoragePipelineOptions, StorageSharedKeyCredential } from '@azure/storage-blob';
import { BlobServiceClient } from '@azure/storage-blob';
// import { DefaultAzureCredential } from "@azure/identity";

const FormSchema = z
    .object({
        patient: z.string().nonempty({
            message: 'Le patient doit être sélectionné.',
        }),
        membre: z.string({
            required_error: 'Un membre doit être sélectionné.',
        }),
        side: z.string().optional(),
        orthosisModel: z.string().nonempty(),
        scanFile: z.object({
            blobUrl: z.string().optional(),
            fileName: z.string().optional()
        }).optional(),
        measurements: z.array(z.object({ key: z.string().nonempty(), value: z.string().nonempty() })),
    })
    .refine(
        (data) => {
            if (data.membre && !data.side) {
                return false;
            }
            return true;
        },
        {
            message: 'Sélectionner un côté.',
            path: ['side'],
        },
    );

type Membre = {
    id: string;
    label: string;
    hasSide: boolean;
};

const membres: Membre[] = [
    { id: 'wrist', label: 'Poignet', hasSide: true },
    { id: 'thumb', label: 'Pouce', hasSide: true },
    { id: 'indexFinger', label: 'Index', hasSide: true },
    { id: 'middleFinger', label: 'Majeur', hasSide: true },
    { id: 'ringFinger', label: 'Annulaire', hasSide: true },
    { id: 'littleFinger', label: 'Auriculaire', hasSide: true },
];

type Measurement = {
    key: string;
    label: string;
    type: 'number' | 'text';
};

type OrthosisDefinition = {
    id: string;
    label: string;
    membres: string[];
    measurements: Measurement[];
};

const orthosisModels: OrthosisDefinition[] = [
    {
        id: 'malletFinger',
        label: 'Doigt en maillet',
        membres: ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'littleFinger'],
        measurements: [
            { key: 'length', label: 'Longueur', type: 'number' },
            { key: 'distalPhalanxDiameter', label: 'Diamètre Phalange Distale', type: 'number' },
            { key: 'middlePhalanxDiameter', label: 'Diamètre Phalange Intermédiaire', type: 'number' },
        ],
    },
    {
        id: 'swanNeck',
        label: 'Col de cygne',
        membres: ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'littleFinger'],
        measurements: [
            { key: 'length', label: 'Longueur', type: 'number' },
            { key: 'middlePhalanxDiameter', label: 'Diamètre Phalange Intermédiaire', type: 'number' },
            { key: 'proximalPhalanxDiameter', label: 'Diamètre Phalange Proximale', type: 'number' },
        ],
    },
    {
        id: 'buttonhole',
        label: 'Boutonnière',
        membres: ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'littleFinger'],
        measurements: [
            { key: 'length', label: 'Longueur', type: 'number' },
            { key: 'middlePhalanxDiameter', label: 'Diamètre Phalange Intermédiaire', type: 'number' },
            { key: 'proximalPhalanxDiameter', label: 'Diamètre Phalange Proximale', type: 'number' },
        ],
    },
    {
        id: 'wrist',
        label: 'Poignet',
        membres: ['wrist'],
        measurements: [],
    },
];

type FormData = z.infer<typeof FormSchema>;

interface CreateOrderFormProps {
    patients: Patient[];
    sheetTrigger: ReactElement<typeof SheetTrigger>;
}

export default function CreateOrderForm({ patients, sheetTrigger }: CreateOrderFormProps) {
    const [patientPopoverOpen, setPatientPopoverOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: FormData) {
        const response = await fetch('https://hook.us1.make.com/v8mvhx1q1qor8tvu81j3yu79ictq20bi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            alert('Commande créée avec succès');
            setIsSubmitted(true);
        } else {
            alert('Erreur lors de la création de la commande');
        }
    }
    
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            // const cred: AnonymousCredential = {
            //     create: (nextPolicy: RequestPolicy, __: RequestPolicyOptions) => {
            //         const anonymousPolicy: AnonymousCredentialPolicy = {
            //             nextPolicy: {
            //                 sendRequest: async (request) => {
            //                     // Modify the request as needed
            //                     return nextPolicy.sendRequest(request);
            //                 },
            //             },
            //         };
            //     },
            // };
            // const connectionString = 
            // "BlobEndpoint=https://altherasandboxstorage.blob.core.windows.net/;" + 
            // "QueueEndpoint=https://altherasandboxstorage.queue.core.windows.net/;" + 
            // "FileEndpoint=https://altherasandboxstorage.file.core.windows.net/;" + 
            // "TableEndpoint=https://altherasandboxstorage.table.core.windows.net/;" + 
            // "SharedAccessSignature=sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-08-27T19:47:30Z&st=2025-08-27T11:32:30Z&spr=https&sig=IGXS3MrjvH41HPB9g0BUsk9G0i9PE1gtGUxK1dpN%2Fiw%3D"
            const sasToken = "sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-08-27T19:47:30Z&st=2025-08-27T11:32:30Z&spr=https&sig=IGXS3MrjvH41HPB9g0BUsk9G0i9PE1gtGUxK1dpN%2Fiw%3D";
            // const blobServiceSasurl = "https://altherasandboxstorage.blob.core.windows.net/?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-08-27T19:47:30Z&st=2025-08-27T11:32:30Z&spr=https&sig=IGXS3MrjvH41HPB9g0BUsk9G0i9PE1gtGUxK1dpN%2Fiw%3D";
            // const fileServiceSasurl = "https://altherasandboxstorage.file.core.windows.net/?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-08-27T19:47:30Z&st=2025-08-27T11:32:30Z&spr=https&sig=IGXS3MrjvH41HPB9g0BUsk9G0i9PE1gtGUxK1dpN%2Fiw%3D";
            const account = "altherasandboxstorage";
            const blobServiceClient = new BlobServiceClient(
                `https://${account}.blob.core.windows.net/?${sasToken}`,
            );
            const containerClient = blobServiceClient.getContainerClient("patients-scans");
            const blobClient = containerClient.getBlobClient("test-upload-file" + Date.now().toString());
            const blockBlobClient = blobClient.getBlockBlobClient();
            // const fileClient = new BlockBlobClient(
            // "BlobEndpoint=https://altherasandboxstorage.blob.core.windows.net/;QueueEndpoint=https://altherasandboxstorage.queue.core.windows.net/;FileEndpoint=https://altherasandboxstorage.file.core.windows.net/;TableEndpoint=https://altherasandboxstorage.table.core.windows.net/;SharedAccessSignature=sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-08-25T20:53:20Z&st=2025-08-25T12:38:20Z&spr=https&sig=ZzwQbtd%2B4nbqjFjF8JXTbfqm5PyJpLPWZZyUnzHq8H8%3D",
            // "patients-scans",
            // "test-upload-file" + Date.now().toString(),
            // {
            //         userAgentOptions: { userAgentPrefix: 'dev-althera-sandbox' },
            //         retryOptions: { maxTries: 3, retryDelayInMs: 1000 },
            //     }
            // );
            const file = event.target.files?.[0];
    
            if (!file) return;
    
            try {
                setIsUploading(true);
                const content = "asdf";
                const uploadResult = await blockBlobClient.upload(content, content.length);
                console.log('Upload result:', uploadResult);
                if (uploadResult?.errorCode !== undefined) {
                    form.setValue('scanFile', undefined);
                }
                form.setValue('scanFile', {
                    blobUrl: "blobUrl",
                    fileName: "fileName",
                });
            } catch (error) {
                console.error('Upload failed:', error);
                // Handle error appropriately
            } finally {
                setIsUploading(false);
            }
        }
        catch (error) {
            console.error('Unexpected error occured during setup:', error);
        }
    };

    const selectedMembre = form.watch('membre');
    const selectedOrthosisModel = form.watch('orthosisModel');

    useEffect(() => {
        const selectedModel = orthosisModels.find((model) => model.id === selectedOrthosisModel);

        if (selectedModel) {
            // best effort to retrieve same measurements
            const currentMeasurements = form.getValues().measurements;
            const newMeasurements = selectedModel.measurements.map((measurement) => {
                const currentMeasurement = currentMeasurements?.find((m) => m.key === measurement.key);
                return {
                    key: measurement.key,
                    value: currentMeasurement ? currentMeasurement.value : '',
                };
            });

            form.reset({
                ...form.getValues(),
                measurements: newMeasurements,
            });
        }
    }, [selectedOrthosisModel, form]);

    return (
        <Sheet>
            {sheetTrigger}
            <SheetContent className="w-11/12">
                <SheetHeader>
                    <SheetTitle>Créer une commande</SheetTitle>
                </SheetHeader>
                <div className="flex h-full w-full flex-row">
                    <div className="h-full w-2/4 pb-10">
                        <ScrollArea className="h-full">
                            <Form {...form}>
                                <h1>Patient</h1>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="ml-2 space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="patient"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Popover open={patientPopoverOpen} onOpenChange={setPatientPopoverOpen}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={patientPopoverOpen}
                                                                className={cn(
                                                                    'w-[200px] justify-between',
                                                                    !field.value && 'text-muted-foreground',
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? patients
                                                                          .find((patient) => patient.id === field.value)
                                                                          ?.fullName
                                                                    : 'Sélectionner un patient...'}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Sélectionner un patient..." />
                                                            <CommandList>
                                                                <CommandGroup>
                                                                    {patients.map((patient) => (
                                                                        <CommandItem
                                                                            value={
                                                                                patient.firstName +
                                                                                ' ' +
                                                                                patient.lastName
                                                                            }
                                                                            key={patient.id}
                                                                            onSelect={() => {
                                                                                form.setValue('patient', patient.id);
                                                                                setPatientPopoverOpen(false)
                                                                            }
                                                                        }
                                                                        >
                                                                            {patient.firstName + ' ' + patient.lastName}
                                                                            <Check
                                                                                className={cn(
                                                                                    'ml-auto',
                                                                                    patient.id === field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0',
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="membre"
                                        render={({ field }) => (
                                            <FormItem className={cn('w-[200px]')}>
                                                <FormLabel>Membre</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner un membre" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {membres.map((membre) => (
                                                            <SelectItem key={membre.id} value={membre.id}>
                                                                {membre.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {selectedMembre &&
                                        membres.find((membre) => membre.id === selectedMembre)?.hasSide && (
                                            <FormField
                                                control={form.control}
                                                name="side"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormLabel>Côté</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex space-x-1"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="left" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Gauche
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-1 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="right" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">Droit</FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage>{form.formState.errors.side?.message}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    <FormField
                                        control={form.control}
                                        name="orthosisModel"
                                        render={({ field }) => (
                                            <FormItem className={cn('w-[200px]')}>
                                                <FormLabel>Modèle</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionner un modèle" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {orthosisModels
                                                            .filter((orthosisModel) =>
                                                                orthosisModel.membres.includes(selectedMembre),
                                                            )
                                                            .map((orthosisModel) => (
                                                                <SelectItem
                                                                    key={orthosisModel.id}
                                                                    value={orthosisModel.id}
                                                                >
                                                                    {orthosisModel.label}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Tabs defaultValue="scan" className="w-[400px]">
                                        <TabsList>
                                            <TabsTrigger value="scan" className="w-[200px]">
                                                Scan
                                            </TabsTrigger>
                                            <TabsTrigger value="manualMeasurements" className="w-[200px]">
                                                Mesures manuelles
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="scan">
                                            <FormField
                                                control={form.control}
                                                name="scanFile"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="space-y-4">
                                                                <Input 
                                                                    id="scanFile" 
                                                                    type="file" 
                                                                    className="h-[50px] w-[400px]"
                                                                    onChange={handleFileUpload}
                                                                    disabled={isUploading}
                                                                    accept=".stl,.obj,.txt"
                                                                />
                                                                {isUploading && (
                                                                    <div className="text-sm text-muted-foreground">
                                                                        Uploading file...
                                                                    </div>
                                                                )}
                                                                {field.value?.fileName && (
                                                                    <div className="text-sm text-green-600">
                                                                        Uploaded: {field.value.fileName}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                        <TabsContent value="manualMeasurements">
                                            {orthosisModels
                                                .find((model) => model.id === selectedOrthosisModel)
                                                ?.measurements.map((measurement, index) => (
                                                    <FormField
                                                        key={measurement.key}
                                                        control={form.control}
                                                        name={`measurements.${index}`}
                                                        defaultValue={{ key: '', value: '' }}
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-3">
                                                                <FormLabel>{measurement.label}</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        onChange={(event) =>
                                                                            form.setValue(field.name, {
                                                                                key: measurement.key,
                                                                                value: event.target.value,
                                                                            })
                                                                        }
                                                                        className="w-[200px]"
                                                                        value={field.value.value}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                        </TabsContent>
                                    </Tabs>
                                    <Button type="submit" disabled={isSubmitted}>
                                        {isSubmitted ? 'Commande créée ! ✅' : 'Créer la commande'}
                                    </Button>
                                </form>
                            </Form>
                        </ScrollArea>
                    </div>
                    <div>
                        <h1>Sommaire</h1>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center space-x-2">
                                <h2 className="text-lg font-medium">Patient</h2>
                                <span>{form.watch('patient')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h2 className="text-lg font-medium">Membre</h2>
                                <span>{form.watch('membre')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h2 className="text-lg font-medium">Côté</h2>
                                <span>{form.watch('side')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h2 className="text-lg font-medium">Modèle</h2>
                                <span>{form.watch('orthosisModel')}</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <h2 className="text-lg font-medium">Mesures</h2>
                                <div className="flex flex-col space-y-2">
                                    {form
                                        .watch('measurements')
                                        ?.map((kv) => kv?.key + ': ' + kv?.value)
                                        ?.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};