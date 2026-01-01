export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_KEY = process.env.API_KEY; // NOTE: For now, we use the API_KEY to authenticate.

export const defaultHeaders = {
    'Content-Type': 'application/json',
};