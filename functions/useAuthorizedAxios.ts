import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { DefaultAxiosRequestHeader } from "./DefaultAxiosRequestHeader";
import { useAccessToken } from "./useAccessToken";

/**
 * This hook can only be used inside `<Authorize>` component.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 * @returns Axios Instance object with Authorization Bearer Access Token set.
 */
export function useAuthorizedAxios(): AxiosInstance {
    const accessToken = useAccessToken();

    const client = useMemo(()=>{
        return axios.create({
            headers: {
                ...DefaultAxiosRequestHeader,
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }, [accessToken]);

    return client;
}
