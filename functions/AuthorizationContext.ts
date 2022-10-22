import React, { useContext } from "react";

export interface UserInfoAddress {
    // formatted: string;
    street_address: string;
    locality: string;
    region: string;
    postal_code: string;
    country: string;
}

export interface UserInfo {
    id: string;
    name: string;
    // given_name: string;
    // family_name: string;
    // middle_name: string;
    // nickname: string;
    // preferred_username: string;
    // profile: string;
    // picture: string;
    // website: string;
    email: string;
    // email_verified: boolean;
    // gender: string;
    // birthdate: string;
    // zoneinfo: string;
    // locale: string;
    // phone_number: string;
    // phone_number_verified: boolean;
    // address: UserInfoAddress;
    // updated_at: number;
    role: string[]
}

export interface AuthorizationContextData {
    accessToken: string;
    user: UserInfo;
    isAuthenticated: boolean;
}

export const AuthorizationContext = React.createContext<AuthorizationContextData>({
    accessToken: '',
    user: {
        id: '',
        name: '',
        email: '',
        role: []
    },
    isAuthenticated: false
});

export function useAuthorizationContext() {
    return useContext(AuthorizationContext);
} 
