import { useFetchWithAccessToken } from "./useFetchWithAccessToken";

/**
 * This hook can be used inside `<Authorize>` component to add Access Token to request headers.
 * Caching is disabled via `DefaultApiRequestHeader` object.
 * @returns SWR Fetcher
 */
export function useSwrFetcherWithAccessToken() {
    const { fetchGET } = useFetchWithAccessToken();
    
    return async (url: string) => {
        // reasoning: SWR fetcher requires `any` data type promise result
        // https://swr.vercel.app/docs/data-fetching#fetch
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error, problem } = await fetchGET<any>(url);
        
        if (error) {
            throw error;
        }

        // throw when status code is not 2XX
        // https://swr.vercel.app/docs/error-handling#status-code-and-error-object        
        if (problem) {
            throw problem;
        }
        return data;
    }
}
