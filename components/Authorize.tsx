import React, { useEffect } from 'react';
import { useSession } from "next-auth/react"
import { signInWithAzureADB2C } from '../functions/SignInWithAzureADB2C';

export const Authorize: React.FC<{
    roles?: string[]
}> = ({ children, roles }) => {

    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'unauthenticated' || session?.['error']) {
            signInWithAzureADB2C();
        }
    }, [session, status]);

    /**
     * Enforce Role-Based Access Control (RBAC) against the accessed page.
     * @returns boolean value signifying whether the user is authorized to access the page or not.
     */
    function tryAuthorize(): boolean {
        if (!roles) {
            return true;
        }

        if (session) {
            const userRoles = session['roles'];
            if (Array.isArray(userRoles)) {
                const roleMatches = roles.filter(role => userRoles.includes(role));
                if (roleMatches.length) {
                    return true;
                }
            }
        }

        return false;
    }

    if (status === 'authenticated') {
        const authorized = tryAuthorize();

        if (authorized) {
            return (
                <>
                    {children}
                </>
            );
        } else {
            return (
                <div>
                    Forbidden
                </div>
            );
        }
    }

    return (
        <div>
            Redirecting to sign in page...
        </div>
    );
}
