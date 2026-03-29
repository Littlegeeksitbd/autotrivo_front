import React from 'react';

const Footer = ({goTo}) => {
    return (
        <>
            {/* ════════════ FOOTER ════════════ */}
            <footer id="footer" className="footer" role="contentinfo">
                <div className="footer__inner">
                    <div className="footer__grid">
                        <div id="footer-brand">
                            <div className="footer__brand-logo">
                                <div className="footer__brand-icon">🎰</div>
                                <span className="footer__brand-name">
                  <span className="navbar__logo-brand">b2clive</span>
                  <span className="navbar__logo-domain">.shop</span>
                </span>
                            </div>
                            <p className="footer__brand-desc">
                                Your complete iGaming solutions provider. 24+ platforms, 12,000+ games,
                                game control, international payments &amp; 24/7 support.
                            </p>
                        </div>
                        <nav id="footer-links" aria-label="Footer quick links">
                            <div className="footer__col-title">QUICK LINKS</div>
                            {["Platforms","Features","Solutions","Live Status","Specs","FAQ"].map(l=>(
                                <a key={l} href={`#${l.toLowerCase().replace(" ","-")}`}
                                   className="footer__link"
                                   onClick={e=>{e.preventDefault();goTo(`#${l.toLowerCase().replace(" ","-")}`);}}>
                                    {l}
                                </a>
                            ))}
                        </nav>
                        <nav id="footer-platforms" aria-label="Top platforms">
                            <div className="footer__col-title">TOP PLATFORMS</div>
                            {["NextBaji","MCW","SuperBaji","BajiLive","Crickex"].map(p=>(
                                <span key={p} className="footer__link">{p}</span>
                            ))}
                        </nav>
                    </div>
                    <div className="footer__bottom">
                        <span className="footer__copyright">© 2026 Autotrivo.com — All rights reserved.</span>
                        <span className="footer__copyright">Complete iGaming Solutions &amp; Platform Management</span>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;