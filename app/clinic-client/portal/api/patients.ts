// app/clinic-client/portal/pages/api/patients.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            // Remplacez ceci par votre logique pour récupérer les patients depuis la base de données
            const patients = [
                { id: 1, idclinique: 1, firstName: 'Joseph', lastName: 'Mukendi', numSec: '123456789413' },
                { id: 2, idclinique: 1, firstName: 'Marie', lastName: 'Dupont', numSec: '987654321012' },
                // Ajoutez d'autres patients ici
            ];
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch patients' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;