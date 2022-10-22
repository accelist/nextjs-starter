import { DefaultApiRequestHeader } from "./DefaultApiRequestHeader";
import { useAuthorizationContext } from "./AuthorizationContext";
import { ProblemDetails } from "../types/ProblemDetails";

export interface ResponseDetails<T> {
    data?: T,
    problem?: ProblemDetails,
    error?: unknown,
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

    async function fetchWrap<T>(url: RequestInfo | URL, init: RequestInit): Promise<ResponseDetails<T>> {
        try {
            const response = await fetch(url, init);
            if (response.ok) {
                const data: T = await response.json();
                return {
                    data: data
                }
            }
            
            const problem: ProblemDetails = await response.json();
            return {
                problem: problem
            }
        } catch (err) {
            return {
                error: err
            }
        }
    }

    return {
        fetchGET: function <T>(url: RequestInfo | URL) {
            return fetchWrap<T>(url, {
                method: 'GET',
                headers: headers,
            });
        },
        fetchPOST: function <T>(url: RequestInfo | URL, body: unknown) {
            return fetchWrap<T>(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
        },
        fetchPUT: function <T>(url: RequestInfo | URL, body: unknown) {
            return fetchWrap<T>(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body),
            });
        },
        fetchPATCH: function <T>(url: RequestInfo | URL, body: unknown) {
            return fetchWrap<T>(url, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(body),
            });
        },
        fetchDELETE: function <T>(url: RequestInfo | URL) {
            return fetchWrap<T>(url, {
                method: 'DELETE',
                headers: headers,
            });
        }
    }
}
