import React, {useState} from 'react';
import FooterCta from "./layout/FooterCta.jsx";
import Footer from "./layout/Footer.jsx";
import SectionHeader from "./layout/SectionHeader.jsx";

const Faq = () => {
    const [openFaq,    setOpenFaq]    = useState(null);

    const FAQS = [
        { q:"What types of platforms do you offer?",         a:"We offer 24+ fully managed iGaming platforms covering casino, sports betting, live casino, crash games, and hybrid solutions. Each platform includes 12,000+ games, game control panel, and international payment gateway." },
        { q:"How many games are available on each platform?",a:"Every platform comes with 12,000+ casino games including slots, live dealers, table games, crash games, sports betting, and instant wins from 50+ top-tier providers." },
        { q:"What is the Game Control Panel?",               a:"The Game Control Panel is a comprehensive dashboard that allows you to manage your game library, configure RTP settings, integrate new providers, and control player access — all in real-time." },
        { q:"What payment methods are supported?",           a:"We support 100+ international and local payment methods including credit/debit cards, e-wallets, bank transfers, mobile banking, and all major cryptocurrencies." },
        { q:"Do you provide complete platform management?",  a:"Yes. We handle everything from setup and launch to daily operations, technical support, updates, security patches, and ongoing optimization." },
        { q:"How long does it take to go live?",             a:"Most platforms can be deployed and go live within 2–4 weeks. Our team handles all technical setup, payment integration, and game configuration." },
    ];

    return (
        <>
            <section id="faq" className="section section--alt">
                <div className="container" style={{maxWidth:860}}>
                    <SectionHeader
                        tag="FAQ"
                        title={<>Frequently Asked <span className="text-primary">Questions</span></>}
                        subtitle="Everything you need to know about our complete iGaming solutions."
                        center
                    />
                    <div className="faq__list" role="list">
                        {FAQS.map((item,i)=>{
                            const open=openFaq===i;
                            return(
                                <div key={i} id={`faq-item-${i+1}`}
                                     className={`faq__item${open?" faq__item--open":""}`} role="listitem">
                                    <button className="faq__question"
                                            onClick={()=>setOpenFaq(open?null:i)}
                                            aria-expanded={open}>
                                        <span>{item.q}</span>
                                        <span className="faq__toggle">+</span>
                                    </button>
                                    {open&&<div id={`faq-answer-${i+1}`} className="faq__answer">{item.a}</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faq;