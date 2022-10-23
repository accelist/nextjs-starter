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
