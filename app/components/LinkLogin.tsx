"use client";
import React, { useEffect, useState } from 'react';
import { LinkAccount } from './LinkAccount';

export const LinkLogin = () => {

    const [linkToken, setLinkToken] = useState<string | null>(null);

    const generateToken = async () => {
        console.log("Generate token ...");
        const response = await fetch('/api/create_link_token');
        const {link_token} = await response.json();
        setLinkToken(link_token);
    }

    useEffect(() => {
        console.log("Link login effect");
    },[linkToken]);

    return (
        <div>

            {
                linkToken === null && <button onClick={ () => generateToken()}>Link Bank Account</button>
            }

            {
                linkToken !== null && <LinkAccount linkToken={linkToken}></LinkAccount>
            }

        </div>

    )
}