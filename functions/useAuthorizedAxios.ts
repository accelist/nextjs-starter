import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { DefaultAxiosRequestHeader } from "./DefaultAxiosRequestHeader";
import { useAuthorizationContext } from "./AuthorizationContext";

/**
 * This hook can only be used inside `<Authorize>` component.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 * @returns Axios Instance object with Authorization Bearer Access Token set.
 */
export function useAuthorizedAxios(): AxiosInstance {
    const { accessToken } = useAuthorizationContext();

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
