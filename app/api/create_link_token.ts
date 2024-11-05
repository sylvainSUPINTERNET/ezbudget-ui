import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as string],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID as string,
      'PLAID-SECRET': process.env.PLAID_SECRET as string,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default function handler(req:NextApiRequest, res: NextApiResponse) {
    if ( req.method === "POST" ) {
        
        res.status(200).json({ name: 'John Doe' })
    } else {
        res.status(405).json({});
    }
}