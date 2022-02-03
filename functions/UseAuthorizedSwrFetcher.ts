import { createSwrFetcher } from "./DefaultSwrFetcher";
import { useAuthorizedAxios } from "./UseAuthorizedAxios";

/**
 * This method can only be used inside `<Authorize>` component.
 * Caching is disabled via `DefaultAxiosRequestHeader` object.
 * @returns SWR Fetcher with Authorization Bearer Header set.
 */
export function useAuthorizedSwrFetcher(){
    const client = useAuthorizedAxios();
    return createSwrFetcher(client);
}
