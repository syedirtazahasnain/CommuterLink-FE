import { API_URL, BASE_URL } from "constants";

export const getAPIURL = (url = '') => {
    return `${API_URL}${url}`;
};

export const getBaseURL = (url = '') => {
    return `${BASE_URL}${url}`;
};

export const displayNotification = (type, text, layout = "bottomRight") => {
    let animation = {
        open: 'animate__animated animate__fadeInRight', 
        close: 'animate__animated animate__fadeOutRight' 
    };
    if (layout == "bottomRight") {
        animation = {
            open: 'animate__animated animate__slideInRight',
            close: 'animate__animated animate__slideOutRight'
        }
    }
    const noty = new Noty({
        type,
        text,
        layout,
        timeout: 5000,
        animation,
        closeWith: ['click', 'button'],
    });
    noty.show();
}