import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faBoxes, faChartLine, faForward, faHome, faTable, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../components/NavLink';
import { DisplaySidebarAtom } from './DisplaySidebarAtom';
import { useAtom } from 'jotai';

export const SideBar: React.FC = () => {

    const [displaySidebar] = useAtom(DisplaySidebarAtom);
    const [compact, setCompact] = useState(true);

    function getCompactSidebarFromLocalStorage(): boolean {
        if (!window?.localStorage) {
            return false;
        }

        const lsCompactSidebar = window.localStorage.getItem('CompactSidebar');
        if (!lsCompactSidebar) {
            return false;
        }

        try {
            return JSON.parse(lsCompactSidebar);
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        setCompact(getCompactSidebarFromLocalStorage());
    }, []);

    function setCompactSidebarToLocalStorage(value: boolean): void {
        setCompact(value);
        if (window?.localStorage) {
            window.localStorage.setItem('CompactSidebar', JSON.stringify(value));
        }
    }

    function getSidebarToggleClass(className: string): string {
        let c = className;
        if (!displaySidebar) {
            c += ' sidebar-hide';
        } else {
            c += ' sidebar-show';
        }
        if (compact) {
            c += ' sidebar-compact';
        }

        return c;
    }

    function getSidebarDisplayClass(): string {
        if (displaySidebar) {
            return 'd-flex';
        } else {
            return 'd-lg-flex d-none';
        }
    }

    const textWhite: React.CSSProperties = {
        color: 'white',
        whiteSpace: 'nowrap'
    };

    function renderCompactIcon() {
        if (compact) {
            // expand
            return (
                <a className='nav-link d-none d-md-block' href='#' style={textWhite} onClick={() => setCompactSidebarToLocalStorage(false)}>
                    <FontAwesomeIcon fixedWidth icon={faForward}></FontAwesomeIcon>
                </a>
            );
        } else {
            // compact
            return (
                <a className='nav-link d-none d-md-block' href='#' style={textWhite} onClick={() => setCompactSidebarToLocalStorage(true)}>
                    <FontAwesomeIcon fixedWidth icon={faBackward}></FontAwesomeIcon>
                    <span className='ms-2'>Compact</span>
                </a>
            );
        }
    }

    const Label: React.FC<{
        children: string | number
    }> = React.useCallback(({ children }) => {
        let className = 'ms-2';
        if (compact) {
            className += ' d-md-none';
        }

        return <span className={className}>{children}</span>
    }, [compact]);

    return (
        <div className={getSidebarToggleClass('sidebar')} >
            <ul className={getSidebarDisplayClass() + ' flex-column flex-fill nav nav-pills p-3'}>
                <li className="nav-item">
                    <NavLink style={textWhite} href='/'>
                        <FontAwesomeIcon fixedWidth icon={faHome}></FontAwesomeIcon>
                        <Label>Home</Label>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={textWhite} href='/dashboard'>
                        <FontAwesomeIcon fixedWidth icon={faChartLine}></FontAwesomeIcon>
                        <Label>Dashboard</Label>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={textWhite}>
                        <FontAwesomeIcon fixedWidth icon={faTable}></FontAwesomeIcon>
                        <Label>Orders</Label>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={textWhite}>
                        <FontAwesomeIcon fixedWidth icon={faBoxes}></FontAwesomeIcon>
                        <Label>Products</Label>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={textWhite}>
                        <FontAwesomeIcon fixedWidth icon={faUsers}></FontAwesomeIcon>
                        <Label>Customers</Label>
                    </NavLink>
                </li>
                <li className="nav-item" style={{ marginTop: 'auto' }}>
                    {renderCompactIcon()}
                </li>
            </ul>
        </div>
    );
}
