import { NextRequest, NextResponse } from 'next/server';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';

import { v4 as uuidv4 } from 'uuid';



// Reminder : 
// step 1 : create link and send to front 
// step 2 : front use link to get public token ( modal to choose bank account )
// step 3 : send public token to back to get access token ( must be stored into secured cookie )

export async function GET( req: NextRequest ) {


    if ( req.method !== "GET" ) {
        return NextResponse.json({ error: "Method not supported" }, { status: 405 });
    }

    
    try {

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

        const { searchParams } = req.nextUrl;
        const language = searchParams.get('language') || 'en'; // TODO use browser language

        console.info("Lang : ", language);

      
        const response = await plaidClient.linkTokenCreate({
            user: {
            client_user_id: `${uuidv4()}`,
            },
            client_name: 'EzBudget',
            products: [Products.Auth], // For some reason, Products.Auth is required to get the link token ( if we add more stuff, it will cause 400 )
            country_codes: [CountryCode.Fr, CountryCode.Gb, CountryCode.Us, CountryCode.Ca],
            redirect_uri: `${process.env.PLAID_REDIRECT_URI}`,
            // webhook: // TODO later : si besoin de raw pour le webhook ( comme Stripe webhook ) 
            /*
            https://nextjs.org/docs/pages/building-your-application/routing/api-routes
            bodyParser is automatically enabled. If you want to consume the body as a Stream or with raw-body, you can set this to false.

            One use case for disabling the automatic bodyParsing is to allow you to verify the raw body of a webhook request, for example from GitHub.


            export const config = {
                api: {
                bodyParser: false,
                },
            }*/
            language
        });
    
        const link_token = response.data.link_token;
        return NextResponse.json({ link_token }, {status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }

}