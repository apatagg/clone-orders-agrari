import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<any> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                navigate('/');
            }
        });

        return () => AuthCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    if (loading) return <p>loading ...</p>;

    return <>{children}</>;
};

export default AuthRoute;
