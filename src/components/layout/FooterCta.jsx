import React from 'react';

const FooterCta = ({goTo}) => {
    return (
        <>
            <section id="cta" className="footer-cta">
                <div className="container" style={{maxWidth:820,textAlign:"center"}}>
                    <h2 className="footer-cta__title">
                        COMPLETE <span className="text-primary">iGAMING</span>
                        <br/>
                        <span className="text-gradient">SOLUTIONS</span> FOR YOUR BUSINESS
                    </h2>
                    <p className="footer-cta__desc">
                        24+ platforms, 12,000+ games, game control, international payments &amp;
                        24/7 dedicated support — all under one roof.
                    </p>
                    <button className="btn btn--primary btn--lg" onClick={()=>goTo("#platforms")}>
                        EXPLORE ALL PLATFORMS →
                    </button>
                </div>
            </section>
        </>
    );
};

export default FooterCta;