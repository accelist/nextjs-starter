import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { DefaultAxiosRequestHeader } from "./DefaultAxiosRequestHeader";
import { useOidcAccessToken } from '@axa-fr/react-oidc';

/**
 * This hook can only be used inside `<OidcSecure>` component.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 * @returns Axios Instance object with Authorization Bearer Access Token set.
 */
export function useAuthorizedAxios(): AxiosInstance {
    const { accessToken } = useOidcAccessToken();

    const client = useMemo(() => {
        return axios.create({
            headers: {
                ...DefaultAxiosRequestHeader,
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }, [accessToken]);

    return client;
}
