import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoxes, faChartLine, faHome, faTable, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../components/NavLink';
import { DisplaySidebarAtom } from './DisplaySidebarAtom';
import { useAtom } from 'jotai';

export const SideBar: React.FC = () => {

    const [displaySidebar, setDisplaySidebar] = useAtom(DisplaySidebarAtom);

    function getSidebarToggleClass(className: string): string {
        let c = className;
        if (!displaySidebar) {
            c += " sidebar-hide";
        } else {
            c += " sidebar-show";
        }

        return c;
    }

    const textWhite: React.CSSProperties = {
        color: 'white'
    };

    return (
        <>
            <div className={getSidebarToggleClass('sidebar')} >
                <ul className="nav nav-pills d-flex flex-column p-3">
                    <li className="nav-item">
                        <NavLink style={textWhite} href='/'>
                            <FontAwesomeIcon fixedWidth icon={faHome} className='me-2'></FontAwesomeIcon>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={textWhite} href='/dashboard'>
                            <FontAwesomeIcon fixedWidth icon={faChartLine} className='me-2'></FontAwesomeIcon>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={textWhite}>
                            <FontAwesomeIcon fixedWidth icon={faTable} className='me-2'></FontAwesomeIcon>
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={textWhite}>
                            <FontAwesomeIcon fixedWidth icon={faBoxes} className='me-2'></FontAwesomeIcon>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={textWhite}>
                            <FontAwesomeIcon fixedWidth icon={faUsers} className='me-2'></FontAwesomeIcon>
                            Customers
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={getSidebarToggleClass('sidebar-bg')}>
                <button className='d-block d-lg-none btn btn-dark' onClick={() => setDisplaySidebar(false)}>
                    <FontAwesomeIcon icon={faBars} className='me-2'></FontAwesomeIcon>
                </button>
            </div>
        </>
    );
}
