import React, { useContext } from "react";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
}

export interface AuthorizationContextData {
    accessToken: string;
    user: UserInfo;
}

export const AuthorizationContext = React.createContext<AuthorizationContextData>({
    accessToken: '',
    user: {
        id: '',
        name: '',
        email: ''
    }
});

export function useAuthorizationContext() {
    return useContext(AuthorizationContext);
} 
