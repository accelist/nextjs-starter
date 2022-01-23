import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../components/NavLink';

export const Navbar: React.FunctionComponent<{
    toggleSidebar?: () => void;
}> = function ({ toggleSidebar }) {

    const onBurgerClick: React.MouseEventHandler<HTMLAnchorElement> = function (e) {
        e.preventDefault();
        if (toggleSidebar) {
            toggleSidebar();
        }
    }

    return (
        <div className="container-fluid stacked-nav">
            <header className="row flex-centered flex-wrap justify-content-lg-between py-3 bg-dark text-light">
                <a href="/" className="col-12 col-lg-3 flex-centered justify-content-lg-start mb-2 mb-lg-0 text-decoration-none">
                    <img className="navbar-logo ms-lg-5" src="/logo.png"></img>
                </a>
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
                <div className="col-12 col-lg-3 flex-centered justify-content-lg-end">
                    <button type="button" className="btn btn-success me-2">
                        <FontAwesomeIcon icon={faSignInAlt} className='me-2'></FontAwesomeIcon>
                        Sign in
                    </button>
                </div>
            </header>
        </div>
    );
};
