import React from 'react';

const Navbar = ({scrolled,NAV_LINKS,activeNav,setMenuOpen,menuOpen}) => {
    return (
        <>
            <nav id="navbar"
                 className={`navbar${scrolled?" navbar--scrolled":""}`}
                 role="navigation" aria-label="Main navigation">

                {/* Logo */}
                <div className="navbar__logo"
                     onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
                     role="button" tabIndex={0}
                     onKeyDown={e=>e.key==="Enter"&&window.scrollTo({top:0,behavior:"smooth"})}>

          <span className="navbar__logo-text">
            <span className="navbar__logo-brand" >
               <img src="logo.png" style={{width: '200px', height: 'auto', marginTop: '20px'}}/>
            </span>
          </span>
                </div>

                {/* Desktop pill */}
                <div className="navbar__menu" role="menubar">
                    {NAV_LINKS.map(l=>(
                        <a key={l.label} href={l.href}
                           className={`navbar__link${activeNav===l.href?" navbar__link--active":""}`}
                           role="menuitem"
                           onClick={e=>{e.preventDefault();goTo(l.href);}}>
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Hamburger */}
                <button
                    className={`navbar__hamburger${menuOpen?" navbar__hamburger--open":""}`}
                    onClick={()=>setMenuOpen(o=>!o)}
                    aria-label={menuOpen?"Close menu":"Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-drawer">
                    <span className="navbar__hamburger-line"/>
                    <span className="navbar__hamburger-line"/>
                    <span className="navbar__hamburger-line"/>
                </button>
            </nav>
        </>
    );
};

export default Navbar;

