import axios, { AxiosInstance } from "axios";
import { DefaultAxiosRequestHeader } from "./DefaultAxiosRequestHeader";

export function createSwrFetcher(client: AxiosInstance) {
    return async (url: string) => {
        const response = await client.get(url);
        return response.data;
    }
}

/**
 * Gets the default Axios client instance.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 */
export const DefaultAxiosClient: AxiosInstance = axios.create({
    headers: DefaultAxiosRequestHeader
});

/**
 * Gets the default SWR fetcher based on Axios web client.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 */
export const DefaultSwrFetcher = createSwrFetcher(DefaultAxiosClient);
