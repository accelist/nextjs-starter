import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../components/NavLink';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../functions/msal';

export const Navbar: React.FC<{
    toggleSidebar?: () => void;
}> = ({ toggleSidebar }) => {

    const { instance, accounts } = useMsal();
    const fullName = accounts[0]?.name;

    function signIn() {
        instance.loginRedirect(loginRequest).catch(console.error);
    }

    function signOut() {
        instance.logoutRedirect().catch(console.error);
    }

    const onBurgerClick: React.MouseEventHandler<HTMLAnchorElement> = function (e) {
        e.preventDefault();
        if (toggleSidebar) {
            toggleSidebar();
        }
    }

    return (
        <div className="container-fluid stacked-nav">
            <header className="row flex-centered flex-wrap justify-content-lg-between py-3 bg-dark text-light">
                <Link href="/">
                    <a className="col-12 col-lg-3 flex-centered justify-content-lg-start mb-2 mb-lg-0 text-decoration-none">
                        <img alt="Logo" className="navbar-logo ms-lg-5" src="/logo.png"></img>
                    </a>
                </Link>
                <ul className="nav col-12 col-lg-auto flex-centered mb-2 mb-lg-0">
                    <li className="d-lg-none">
                        <a href="#" className="nav-link" onClick={onBurgerClick}>
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </a>
                    </li>
                    <li>
                        <NavLink href='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink>Features</NavLink>
                    </li>
                    <li>
                        <NavLink>Pricing</NavLink>
                    </li>
                    <li>
                        <NavLink>FAQ</NavLink>
                    </li>
                    <li>
                        <NavLink href='/about'>About</NavLink>
                    </li>
                </ul>
                <div className="col-12 col-lg-3 flex-centered justify-content-lg-end me-3">
                    <AuthenticatedTemplate>
                        <Dropdown align='end'>
                            <Dropdown.Toggle variant='link' style={{
                                color: 'white',
                                textDecoration: 'none'
                            }}>
                                Signed in as {fullName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => signOut()}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className='me-2'></FontAwesomeIcon>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <button type="button" onClick={signIn} className="btn btn-success">
                            <FontAwesomeIcon icon={faSignInAlt} className='me-2'></FontAwesomeIcon>
                            Sign in
                        </button>
                    </UnauthenticatedTemplate>
                </div>
            </header>
        </div>
    );
};
