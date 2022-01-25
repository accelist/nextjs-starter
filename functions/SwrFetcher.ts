import axios from "axios";

const client = axios.create({
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

function createSwrFetcher() {
    return async (url: string) => {
        const response = await client.get(url);
        return response.data;
    }
}

export const SwrFetcher = createSwrFetcher();
