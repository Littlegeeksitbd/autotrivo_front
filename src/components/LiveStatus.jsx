import React from 'react';
import SectionHeader from "./layout/SectionHeader.jsx";

const LiveStatus = () => {

    const LIVE_PLATFORMS = [
        { name:"NextBaji",    uptime:"99.9%", ping:"12ms" },
        { name:"Krikiya",     uptime:"99.8%", ping:"18ms" },
        { name:"MCW Letest",  uptime:"99.9%", ping:"9ms"  },
        { name:"SuperBaji",   uptime:"99.7%", ping:"22ms" },
        { name:"BajiLive",    uptime:"99.9%", ping:"15ms" },
        { name:"Crickex",     uptime:"99.6%", ping:"28ms" },
        { name:"BajiBD",      uptime:"99.8%", ping:"19ms" },
        { name:"Agun88",      uptime:"99.9%", ping:"11ms" },
        { name:"MaleBet",     uptime:"99.5%", ping:"24ms" },
        { name:"GrapWin",     uptime:"99.8%", ping:"16ms" },
    ];

    return (
        <>
            <section id="live-status" className="section section--alt">
                <div className="container">
                    <SectionHeader
                        tag="ALL PLATFORMS ONLINE"
                        title={<>All Platforms <span className="text-green">Online</span></>}
                        subtitle="Real-time monitoring across all 24+ managed platforms. 99.9% uptime guaranteed."
                    />
                    <div className="live-grid">
                        {LIVE_PLATFORMS.map((p,i)=>(
                            <div key={i} className="live-card" id={`live-${p.name.toLowerCase().replace(/\s+/g,"-")}`}>
                                <div>
                                    <div className="live-card__name">{p.name}</div>
                                    <div className="live-card__meta">Uptime: {p.uptime} · {p.ping}</div>
                                </div>
                                <div className="live-card__status">
                                    <div className="live-card__dot"/>
                                    <span className="live-card__label">ONLINE</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LiveStatus;