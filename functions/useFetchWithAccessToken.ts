import { DefaultApiRequestHeader } from "./DefaultApiRequestHeader";
import { useAuthorizationContext } from "./AuthorizationContext";
import { ProblemDetails } from "../types/ProblemDetails";

/**
 * Simplified wrapper of the Fetch API response object.
 */
export interface ResponseDetails<T> {
    /**
     * JSON parsed object of the response body if `response.ok`
     */
    data?: T;

    /**
     * RFC 7807 Problem Details JSON response if not `response.ok` or a `string` if the response is not JSON. 
     */
    problem?: ProblemDetails | string;

    /**
     * Exception thrown when performing the HTTP request.
     */
    error?: unknown;
}

/**
 * Wraps the Fetch API inside a try-catch block and expects JSON response when ok 
 * and RFC 7807 Problem Details JSON response when not ok.
 * @param url 
 * @param init 
 * @returns `data` when `response.ok`, `problem` when not `response.ok`, and `error` when exception
 */
export async function tryFetchJson<T>(url: RequestInfo | URL, init: RequestInit): Promise<ResponseDetails<T>> {
    try {
        const response = await fetch(url, init);
        if (response.ok) {
            const data: T = await response.json();
            return {
                data: data
            };
        }

        try {
            const problem: ProblemDetails = await response.json();
            return {
                problem: problem
            };
        } catch (problemNotJson) {
            const responseBody = await response.text();
            return {
                problem: responseBody
            };
        }
    } catch (err) {
        return {
            error: err
        };
    }
}

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
    if (isAuthenticated) {
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
