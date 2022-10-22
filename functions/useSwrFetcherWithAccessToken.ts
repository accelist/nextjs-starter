import { useFetchWithAccessToken } from "./useFetchWithAccessToken";

/**
 * This hook can be used inside `<Authorize>` component to add Access Token to request headers.
 * Caching is disabled via `DefaultApiRequestHeader` object.
 * @returns SWR Fetcher
 */
export function useSwrFetcherWithAccessToken() {
    const { fetchGET } = useFetchWithAccessToken();
    return async (url: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error, problem } = await fetchGET<any>(url);
        if (error) {
            throw error;
        }
        if (problem) {
            throw problem;
        }
        return data;
    }
}
