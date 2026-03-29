import React from 'react';
import SectionHeader from "./layout/SectionHeader.jsx";

const Solutions = () => {

    const FEATURES = [
        { emoji:"🎰", title:"12,000+ Casino Games",         desc:"Slots, table games, live dealers, crash games, and instant wins from 50+ top-tier game providers worldwide." },
        { emoji:"⚡", title:"Live Sports Betting",           desc:"Real-time odds on 40+ sports with in-play betting, live streaming, and multi-market accumulators." },
        { emoji:"🎮", title:"Game Control Panel",            desc:"Full game control dashboard to manage game settings, RTP configurations, and player access across all platforms." },
        { emoji:"🌍", title:"International Payment Gateway", desc:"Integrated solutions supporting 100+ methods — cards, e-wallets, bank transfers, and crypto." },
        { emoji:"🎬", title:"Live Casino Studios",           desc:"Professional HD-streamed live dealer games — Baccarat, Roulette, Blackjack, and Game Shows." },
        { emoji:"🛡️", title:"24/7 Support Desk",            desc:"Round-the-clock dedicated support team providing complete platform management and technical assistance." },
        { emoji:"📱", title:"Mobile Optimized",              desc:"Fully responsive platforms delivering flawless performance on phone, tablet, or desktop." },
        { emoji:"🔒", title:"Secure & Reliable",             desc:"SSL encryption, secure payment processing, and 99.9% uptime guarantee across all platforms." },
        { emoji:"⚙️", title:"Complete Platform Management", desc:"End-to-end casino platform management — setup, operations, updates, and ongoing support." },
    ];

    return (
        <>
            <section id="solutions" className="section section--alt">
                <div className="container">
                    <SectionHeader
                        tag="WHY CHOOSE US"
                        title={<>Why Our <span className="text-primary">Solutions</span> Stand Out</>}
                        subtitle="Every platform comes with complete iGaming features, game control, international payments, and 24/7 dedicated support."
                    />
                    <div className="features__grid">
                        {FEATURES.map((f,i)=>(
                            <article key={i} className="feature-card" id={`feature-${i+1}`}>
                                <div className="feature-card__icon">{f.emoji}</div>
                                <h3 className="feature-card__title">{f.title}</h3>
                                <p className="feature-card__desc">{f.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Solutions;