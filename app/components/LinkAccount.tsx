import { useCallback, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

export const LinkAccount = (props: {linkToken:string}) => {

    
    const onSuccess = useCallback((public_token:string, metadata:any) => {

        console.log("Public token to send to back todo");
        // TODO send public_token to server 
        /*
        const response = fetch('/api/set_access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_token }),
        });
        */
        // Handle response ...
      }, []);


    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken,
        onSuccess,
    };
      
    const { open, ready } = usePlaidLink({
        token: `${props.linkToken}`,
        onSuccess,
    });

    useEffect( () => {
        console.log("LinkAccount effect");
        if (ready) {
            open();
        }
    })

    return ( <></>    )


};