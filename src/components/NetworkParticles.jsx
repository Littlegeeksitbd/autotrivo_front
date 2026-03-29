import React, {useEffect, useRef} from 'react';

const NetworkParticles = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);
        const COLORS = [
            [31,193,134],   // #1FC186 primary green
            [52, 211,153],  // #34D399 mid green
            [0,  82, 64],   // #005240 teal
            [78, 234,168],  // #4EEAA8 light green
        ];
        const pts = Array.from({length:90},()=>({
            x:Math.random()*canvas.width, y:Math.random()*canvas.height,
            vx:(Math.random()-.5)*.55, vy:(Math.random()-.5)*.55,
            r:1.5+Math.random()*2,
            col:COLORS[Math.floor(Math.random()*COLORS.length)],
        }));
        const mouse={x:-9999,y:-9999};
        const onMove=(e)=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;};
        canvas.addEventListener("mousemove",onMove);
        canvas.addEventListener("mouseleave",()=>{mouse.x=-9999;mouse.y=-9999;});
        let raf;
        const draw=()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            pts.forEach(p=>{
                p.x+=p.vx; p.y+=p.vy;
                if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
                if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
                const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
                if(d<100&&d>0){p.x+=dx/d*1.2;p.y+=dy/d*1.2;}
            });
            for(let i=0;i<pts.length;i++){
                for(let j=i+1;j<pts.length;j++){
                    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,dist=Math.sqrt(dx*dx+dy*dy);
                    if(dist<140){
                        ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
                        ctx.strokeStyle=`rgba(31,193,134,${(1-dist/140)*.22})`;ctx.lineWidth=.7;ctx.stroke();
                    }
                }
            }
            pts.forEach(p=>{
                const[r,g,b]=p.col;
                ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle=`rgba(${r},${g},${b},.75)`;ctx.shadowBlur=6;ctx.shadowColor=`rgba(${r},${g},${b},.5)`;
                ctx.fill();ctx.shadowBlur=0;
            });
            raf=requestAnimationFrame(draw);
        };
        draw();
        return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);canvas.removeEventListener("mousemove",onMove);};
    },[]);
    return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true"/>;
};

export default NetworkParticles;
