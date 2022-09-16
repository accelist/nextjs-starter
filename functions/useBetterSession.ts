import { useSession } from "next-auth/react";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
}

interface BetterSession extends UserInfo {
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useBetterSession(): BetterSession {
    const { data: session, status } = useSession();
    // console.log(session);

    return {
        id: session?.user?.['id'] ?? '',
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
        isAuthenticated: (status === 'authenticated'),
        isLoading: (status === 'loading'),
    }
} 
