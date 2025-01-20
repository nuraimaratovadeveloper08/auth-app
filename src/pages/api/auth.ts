import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.post('https://beeceptor.com/mock-api/auth', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data: ${error}` });
    }
}
