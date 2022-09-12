import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../components/NavLink';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { DisplaySidebarAtom } from './DisplaySidebarAtom';
import { useOidcUser, useOidc } from '@axa-fr/react-oidc';

export const Navbar: React.FC = () => {
    const [displaySidebar, setDisplaySidebar] = useAtom(DisplaySidebarAtom);
    const { isAuthenticated, login, logout } = useOidc();
    const { oidcUser } = useOidcUser();

    const onBurgerClick: React.MouseEventHandler<HTMLAnchorElement> = function (e) {
        e.preventDefault();
        setDisplaySidebar(!displaySidebar);
    }

    function renderLoginLogoutButtons() {
        if (isAuthenticated) {
            return (
                <div>
                    <p>
                        Signed in as {oidcUser?.name}
                    </p>
                    <p>
                        <button type='button' onClick={() => logout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} className='me-2'></FontAwesomeIcon>
                            Sign out
                        </button>
                    </p>
                </div>
            );
        }

        return (
            <button type="button" onClick={() => login()} className="btn btn-success">
                <FontAwesomeIcon icon={faSignInAlt} className='me-2'></FontAwesomeIcon>
                Sign in
            </button>
        );
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
                    <li className="nav-item d-lg-none">
                        <a href="#" className="nav-link" onClick={onBurgerClick}>
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <NavLink href='/'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink>Features</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink>Pricing</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink>FAQ</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink href='/about'>About</NavLink>
                    </li>
                </ul>
                <div className="col-12 col-lg-3 flex-centered justify-content-lg-end me-3">
                    {renderLoginLogoutButtons()}
                </div>
            </header>
        </div>
    );
};
