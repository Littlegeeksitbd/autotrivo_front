import React, {useEffect, useRef, useState} from 'react';

const BubbleBg = () => {
    const bRef=useRef(Array.from({length:60},(_,i)=>({
        x:(i*137.508)%100,y:Math.random()*100,
        size:1.5+Math.random()*5,
        vy:.007+Math.random()*.016,vx:(Math.random()-.5)*.005,
        phase:Math.random()*Math.PI*2,
    })));
    const[,re]=useState(0);
    useEffect(()=>{
        let raf;
        const tick=()=>{
            bRef.current.forEach(b=>{b.y-=b.vy;b.x+=b.vx;b.phase+=.018;
                if(b.y<-2){b.y=102;b.x=Math.random()*100;}
                if(b.x<-2)b.x=102; if(b.x>102)b.x=-2;
            });
            re(n=>n+1); raf=requestAnimationFrame(tick);
        };
        raf=requestAnimationFrame(tick);
        return()=>cancelAnimationFrame(raf);
    },[]);
    return (
        <>
            <div className="bubble-bg" aria-hidden="true">
                {bRef.current.map((b,i)=>{
                    const op=.05+Math.sin(b.phase)*.04+(b.size>4?.08:.04);
                    const col=b.size>4.5?`rgba(168,85,247,${op})`:b.size>3?`rgba(99,102,241,${op})`:`rgba(255,255,255,${op})`;
                    return<div key={i} className="bubble-bg__dot" style={{left:`${b.x}%`,top:`${b.y}%`,width:b.size,height:b.size,background:col,filter:b.size>4?"blur(1px)":"none"}}/>;
                })}
            </div>
        </>
    );
};

export default BubbleBg;
