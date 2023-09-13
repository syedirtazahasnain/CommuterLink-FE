import {React, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Redirect = ({ to, passCurrentRoute }) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        navigate({
            pathname: to,
            search: passCurrentRoute ? `?return=${location.pathname}` : ''
        });
    }, []);

}

Redirect.defaultProps = {
    to: '/',
    passCurrentRoute: false,
};

export default Redirect;
