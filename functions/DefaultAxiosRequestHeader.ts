import { AxiosRequestHeaders } from 'axios';

/**
 * Gets the header for disabling Axios request caching
 */
export const DefaultAxiosRequestHeader: AxiosRequestHeaders = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
};
