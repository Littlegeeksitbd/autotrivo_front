import React from 'react';
import OrbitHero from "./OrbitHero.jsx";
import NetworkParticles from "./NetworkParticles.jsx";

const Hero = () => {
    return (
        <>
            <section id="hero" className="hero">
                <NetworkParticles/>
                <div className="hero__glow hero__glow--purple"/>
                <div className="hero__glow hero__glow--gold"/>
                <div className="hero__inner">
                    <div className="hero__content">
                        <div className="hero__badge">
                            <span className="hero__badge-dot"/>
                            Complete iGaming Solutions
                        </div>
                        <h1 className="hero__title" id="hero-title">
                            <span className="hero__title-line--white">COMPLETE</span>
                            <span className="hero__title-line--white">
                <span className="hero__title-line--gold">iGAMING</span> &amp;
              </span>
                            <span className="hero__title-line--gradient">BETTING</span>
                            <span className="hero__title-line--white">SOLUTIONS</span>
                        </h1>
                        <p className="hero__description">
                            We provide complete iGaming solutions with 12,000+ games, game control options,
                            international payment gateways, and 24/7 dedicated support. 24+ fully managed
                            casino &amp; betting platforms — everything you need under one roof.
                        </p>
                        <div className="hero__actions">
                            <button className="btn btn--primary" onClick={()=>goTo("#platforms")}>EXPLORE PLATFORMS →</button>
                            <button className="btn btn--outline"  onClick={()=>goTo("#specs")}>VIEW FULL SPECS</button>
                        </div>
                    </div>
                    <OrbitHero/>
                </div>
            </section>
        </>
    );
};

export default Hero;


