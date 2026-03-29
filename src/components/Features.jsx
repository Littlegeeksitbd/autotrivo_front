import React from 'react';
import LiveStatus from "./LiveStatus.jsx";
import Specs from "./Specs.jsx";
import Faq from "./Faq.jsx";
import FooterCta from "./layout/FooterCta.jsx";
import Footer from "./layout/Footer.jsx";
import SectionHeader from "./layout/SectionHeader.jsx";

const Features = () => {

    const BUILD_FEATURES = [
        { emoji:"🚀", title:"Platform Setup & Launch",           desc:"Complete casino platform deployment with 12,000+ games, payment integration, and custom branding — ready to go live." },
        { emoji:"🎮", title:"Game Control & Management",         desc:"Advanced game control panel for managing game library, RTP settings, provider integration, and player game access in real-time." },
        { emoji:"🌍", title:"International Payment Integration", desc:"Seamless integration of 100+ international & local payment methods — credit cards, e-wallets, bank transfers, mobile banking, and crypto." },
        { emoji:"🛡️", title:"24/7 Technical Support",           desc:"Our support desk never sleeps. Round-the-clock monitoring, troubleshooting, and technical assistance for all your platforms." },
        { emoji:"📊", title:"Operations & Analytics",            desc:"Complete back-office management with player analytics, revenue tracking, risk management, and performance optimization tools." },
        { emoji:"🔧", title:"Ongoing Updates & Maintenance",     desc:"Regular platform updates, new game additions, security patches, and feature enhancements to keep your casino ahead of the competition." },
    ];

    return (
        <>
            <section id="features" className="section">
                <div className="container">
                    <SectionHeader
                        tag="COMPLETE IGAMING SOLUTIONS"
                        title={<>We Build, Manage &amp; <span className="text-primary">Support</span> Your Casino</>}
                        subtitle="From launch to daily operations — we provide end-to-end iGaming solutions so you can focus on growing your business."
                    />
                    <div className="build__grid">
                        {BUILD_FEATURES.map((f,i)=>(
                            <article key={i} className="build-card" id={`build-feature-${i+1}`}>
                                <div className="build-card__icon">{f.emoji}</div>
                                <h3 className="build-card__title">{f.title}</h3>
                                <p className="build-card__desc">{f.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;