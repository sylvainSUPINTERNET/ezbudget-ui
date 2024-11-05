"use client";
import React, { useEffect, useState } from 'react';

export const LinkLogin = ({data}: {data:any}) => {
    useEffect(() => {
        console.log("LinkLogin");
    },[]);
    return (
        <div>
            <button onClick={ () => {
                alert("ok")
            }}>
            LOGINS
            </button>
            {
                JSON.stringify(data)
            }
        </div>

    )
}