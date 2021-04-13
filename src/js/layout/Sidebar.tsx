import React from 'react';

export const SideBar: React.FunctionComponent = function () {
    return (
        <div className="sidebar d-flex flex-column p-3 text-white bg-dark">
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active">
                        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#home" /></svg>
            Home
          </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#speedometer2" /></svg>
            Dashboard
          </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#table" /></svg>
            Orders
          </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#grid" /></svg>
            Products
          </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#people-circle" /></svg>
            Customers
          </a>
                </li>
            </ul>
        </div>
    );
}
