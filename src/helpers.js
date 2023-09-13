import { API_URL, BASE_URL } from "constants";

export const getAPIURL = (url = '') => {
    return `${API_URL}${url}`;
};

export const getBaseURL = (url = '') => {
    return `${BASE_URL}${url}`;
};