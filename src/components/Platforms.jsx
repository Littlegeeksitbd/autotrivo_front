import React, {useEffect, useState} from 'react';
import SectionHeader from "./layout/SectionHeader.jsx";
import {baseUrl} from "../config";
import axios from "axios";


const Platforms = ({openAuth}) => {

    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/service`);
                setPlatforms(res.data.data || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchPlatforms();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "40px" }}>
                Loading platforms...
            </div>
        );
    }

    return (
        <>
            <section id="platforms" className="section">
                <div className="container">
                    <SectionHeader
                        tag="OUR PLATFORMS"
                        title={<>Casino &amp; Betting <span className="text-primary">Platforms</span></>}
                        subtitle="Explore our complete collection of premium casino and betting platforms — each one built for performance and reliability."
                    />
                    <div className="platforms__grid">
                        {platforms.map((p,i)=>(
                            <article key={i} className="platform-card" id={`platform-${p.name.toLowerCase().replace(/\s+/g,"-")}`}>
                                <div className="platform-card__header">
                                    <div className="platform-card__icon" style={{background:`${p.color}1a`,border:`1px solid ${p.color}35`}}>{p.emoji}</div>
                                    <div><div className="platform-card__name">{p.name}</div><div className="platform-card__sub">{p.sub}</div></div>
                                </div>
                                <span className="platform-card__tag" style={{background:`${p.color}18`,color:p.color}}>{p.tag}</span>
                                <p className="platform-card__desc">{p.description}</p>
                                <div className="platform-card__specs">
                                    {[["Games","12,000+"],["Game Control","Full Panel"],["Payments","Intl. Gateway"],["Support","24/7 Dedicated"]].map(([k,v])=>(
                                        <div key={k} className="platform-card__spec-row">
                                            <span className="platform-card__spec-key">{k}</span>
                                            <span className="platform-card__spec-val">{v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="platform-card__actions">
                                    <button className="platform-card__btn platform-card__btn--buy"
                                            onClick={() => openAuth("login")}>
                                        🛒 BUY NOW
                                    </button>
                                    <button className="platform-card__btn platform-card__btn--demo">
                                        VIEW LIVE DEMO ↗
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Platforms;