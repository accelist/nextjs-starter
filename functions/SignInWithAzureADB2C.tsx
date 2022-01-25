import { signIn } from "next-auth/react";

export function signInWithAzureADB2C(){
    signIn('azure-ad-b2c', undefined, {
        prompt: 'login'
    });
}
