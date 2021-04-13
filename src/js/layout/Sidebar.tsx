import React from 'react';

export const SideBar: React.FunctionComponent<{
    display: boolean
}> = function ({ display }) {

    function sideBarClass(): string {
        let c = "sidebar d-flex flex-column text-white bg-dark";
        if (!display){
            c += " sidebar-hide";
        } else {
            c += " sidebar-show";
        }

        return c;
    }

    return (
        <div className={sideBarClass()} >
            <ul className="nav nav-pills d-flex flex-column p-3">
                <li className="nav-item">
                    <a href="#" className="nav-link active">
                        <svg className="bi me-2" width={16} height={16}>
                            <use xlinkHref="#home" />
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}>
                            <use xlinkHref="#speedometer2" />
                        </svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}>
                            <use xlinkHref="#table" />
                        </svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}>
                            <use xlinkHref="#grid" />
                        </svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}>
                            <use xlinkHref="#people-circle" />
                        </svg>
                        Customers
                    </a>
                </li>
            </ul>
        </div>
    );
}
