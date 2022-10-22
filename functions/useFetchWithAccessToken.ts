import { DefaultApiRequestHeader } from "./DefaultApiRequestHeader";
import { useAuthorizationContext } from "./AuthorizationContext";
import { tryFetchJson } from "./tryFetchJson";

/**
 * This hook can be used inside `<Authorize>` component to add Access Token to fetch requests headers.
 * Caching is disabled via `DefaultApiRequestHeader` object.
 * @returns Fetch wrapper methods
 */
export function useFetchWithAccessToken() {
    const { accessToken, isAuthenticated } = useAuthorizationContext();

    const headers: Record<string, string> = {
        ...DefaultApiRequestHeader
    };
    if (isAuthenticated && accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return {
        /**
         * Fetch a URL with GET method with JSON response.
         * If method is called inside `<Authorize>` component context, will append Access Token to request header
         * @param url 
         * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
         */
        fetchGET: function <T>(url: RequestInfo | URL) {
            return tryFetchJson<T>(url, {
                method: 'GET',
                headers: headers,
            });
        },

        /**
         * Fetch a URL with POST method with JSON serialized request body and JSON response. 
         * If method is called inside `<Authorize>` component context, will append Access Token to request header
         * @param url 
         * @param body 
         * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
         */
        fetchPOST: function <T>(url: RequestInfo | URL, body: unknown = undefined) {
            return tryFetchJson<T>(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
        },

        /**
         * Fetch a URL with PUT method with JSON serialized request body and JSON response. 
         * If method is called inside `<Authorize>` component context, will append Access Token to request header
         * @param url 
         * @param body 
         * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
         */
        fetchPUT: function <T>(url: RequestInfo | URL, body: unknown = undefined) {
            return tryFetchJson<T>(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body),
            });
        },

        /**
         * Fetch a URL with PATCH method with JSON serialized request body and JSON response. 
         * If method is called inside `<Authorize>` component context, will append Access Token to request header
         * @param url 
         * @param body 
         * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
         */
        fetchPATCH: function <T>(url: RequestInfo | URL, body: unknown = undefined) {
            return tryFetchJson<T>(url, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(body),
            });
        },

        /**
         * Fetch a URL with DELETE method with JSON response.
         * If method is called inside `<Authorize>` component context, will append Access Token to request header
         * @param url 
         * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
         */
        fetchDELETE: function <T>(url: RequestInfo | URL) {
            return tryFetchJson<T>(url, {
                method: 'DELETE',
                headers: headers,
            });
        }
    }
}
