import React from 'react';

const Stats = () => {

    const STATS = [
        { value:"24+",   label:"LIVE PLATFORMS",  gFrom:"#1FC186", gTo:"#4EEAA8" },
        { value:"12K+",  label:"CASINO GAMES",    gFrom:"#1FC186", gTo:"#34D399" },
        { value:"50+",   label:"GAME PROVIDERS",  gFrom:"#34D399", gTo:"#10B981" },
        { value:"100+",  label:"PAYMENT METHODS", gFrom:"#1FC186", gTo:"#059669" },
        { value:"99.9%", label:"UPTIME",          gFrom:"#4EEAA8", gTo:"#1FC186" },
        { value:"24/7",  label:"SUPPORT DESK",    gFrom:"#34D399", gTo:"#1FC186" },
    ];

    return (
        <>
            <section id="stats" className="stats-bar">
                <div className="stats-bar__grid">
                    {STATS.map((s,i)=>(
                        <div key={i} className="stats-bar__item">
                            <div className="stats-bar__value" style={{backgroundImage:`linear-gradient(135deg,${s.gFrom},${s.gTo})`}}>{s.value}</div>
                            <div className="stats-bar__label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Stats;