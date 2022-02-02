import React from 'react';
import { Title } from '../../components/Title';
import { Page } from '../../types/Page';

const SignInPage: Page = () => {
    // This page is intentionally left blank
    // MSAL should automatically redirect user to previous URL that started the login process
    return (
        <div>
            <Title name="Signing in..."></Title>
        </div>
    );
}

export default SignInPage;
