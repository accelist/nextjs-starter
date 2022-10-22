/**
 * Gets the HTTP header for disabling request caching to Web API.
 */
export const DefaultApiRequestHeader = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};
