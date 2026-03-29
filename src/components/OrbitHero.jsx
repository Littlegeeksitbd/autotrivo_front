import React, {useEffect, useRef, useState} from 'react';

const OrbitHero = () => {

    const ORBIT_ITEMS = [
        { emoji:"🏈", angle:0,   borderColor:"#1FC186", size:50 },
        { emoji:"❤️", angle:42,  borderColor:"#34D399", size:46 },
        { emoji:"🏆", angle:88,  borderColor:"#4EEAA8", size:50 },
        { emoji:"♦️", angle:132, borderColor:"#1FC186", size:44 },
        { emoji:"💎", angle:178, borderColor:"#34D399", size:46 },
        { emoji:"♠️", angle:222, borderColor:"#005240", size:44 },
        { emoji:"♣️", angle:265, borderColor:"#184129", size:44 },
        { emoji:"🎯", angle:308, borderColor:"#1FC186", size:46 },
    ];

    const [angle, setAngle] = useState(0);
    const wrapRef = useRef(null);
    const [S, setS] = useState(516);

    useEffect(()=>{
        const el=wrapRef.current; if(!el) return;
        const ro=new ResizeObserver(([e])=>setS(Math.round(e.contentRect.width)));
        ro.observe(el);
        return()=>ro.disconnect();
    },[]);

    useEffect(()=>{
        let raf,last=performance.now();
        const tick=(now)=>{setAngle(a=>a+(now-last)*.013);last=now;raf=requestAnimationFrame(tick);};
        raf=requestAnimationFrame(tick);
        return()=>cancelAnimationFrame(raf);
    },[]);



    const CX=S/2, CY=S/2, R=S*.383, orbSz=S*.302, scale=S/516;
    return (
        <>
            <div ref={wrapRef} id="hero-orbit" className="hero__orbit" aria-hidden="true">
                <svg width={S} height={S} className="hero__orbit-svg">
                    <defs>
                        <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%"   stopColor="rgba(168,85,247,.18)"/>
                            <stop offset="100%" stopColor="rgba(168,85,247,0)"/>
                        </radialGradient>
                    </defs>
                    <circle cx={CX} cy={CY} r={R+24}    fill="url(#orb-glow)"/>
                    <circle cx={CX} cy={CY} r={R}       fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
                    <circle cx={CX} cy={CY} r={R*.52}   fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                </svg>
                <div className="hero__orbit-center"
                     style={{left:CX-orbSz/2,top:CY-orbSz/2,width:orbSz,height:orbSz,fontSize:S*.027}}>
                    <span>b2clive</span><span style={{opacity:.8}}>.shop</span>
                </div>
                <div className="hero__orbit-badge"
                     style={{left:CX-S*.248,top:CY-R-S*.042,fontSize:S*.025}}>
                    <span className="hero__orbit-badge-dot"/>&nbsp;12,000+ Games
                </div>
                {ORBIT_ITEMS.map((item,i)=>{
                    const rad=((item.angle+angle)*Math.PI)/180;
                    const sz=item.size*scale, x=CX+R*Math.cos(rad)-sz/2, y=CY+R*Math.sin(rad)-sz/2;
                    return(
                        <div key={i} className="hero__orbit-icon"
                             style={{left:x,top:y,width:sz,height:sz,fontSize:sz*.42,border:`2px solid ${item.borderColor}`,boxShadow:`0 0 14px ${item.borderColor}50`}}>
                            {item.emoji}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default OrbitHero;


