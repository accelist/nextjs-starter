import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavLink: React.FC<{
    href?: string,
    style?: React.CSSProperties
}> = ({ href, children, style }) => {

    const router = useRouter();

    function getAnchorClassNames() {
        if (href) {
            // root path requires exact same path to be compared
            if (href === '/') {
                if (router.pathname === '/') {
                    return 'nav-link active';
                }
            } else if (router.pathname.startsWith(href)) {
                return 'nav-link active';
            }
        }

        return 'nav-link';
    }

    return (
        <Link href={href ?? '#'}>
            <a className={getAnchorClassNames()} style={style}>
                {children}
            </a>
        </Link>
    );
}
