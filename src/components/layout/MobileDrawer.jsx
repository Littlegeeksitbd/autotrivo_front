import React from 'react';

const MobileDrawer = ({NAV_LINKS,menuOpen,activeNav }) => {
    return (
        <div>
            <div id="mobile-drawer"
                 className={`navbar__drawer${menuOpen?" navbar__drawer--open":""}`}
                 role="menu" aria-hidden={!menuOpen}>
                {NAV_LINKS.map(l=>(
                    <a key={l.label} href={l.href}
                       className={`navbar__drawer-link${activeNav===l.href?" navbar__drawer-link--active":""}`}
                       role="menuitem"
                       onClick={e=>{e.preventDefault();goTo(l.href);}}>
                        {l.label}
                    </a>
                ))}
            </div>

        </div>
    );
};

export default MobileDrawer;