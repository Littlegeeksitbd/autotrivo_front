import { useState, useEffect, useRef } from "react";
import "./index.css";
import axios from "axios";
import {baseUrl} from "./config.js"
import LoginForm from "./components/LoginForm.jsx";
import RegForm from "./components/RegForm.jsx";
/* ================================================================
   DATA
================================================================ */
const NAV_LINKS = [
  { label:"Platforms",   href:"#platforms"   },
  { label:"Features",    href:"#features"    },
  { label:"Solutions",   href:"#solutions"   },
  { label:"Live Status", href:"#live-status" },
  { label:"Specs",       href:"#specs"       },
  { label:"FAQ",         href:"#faq"         },
];
const TICKER_ITEMS = ["BAJIBD","NEXTBAJI","KRIKIYA","MCW LETEST","CRICKEX","CK444","YESB","DARAZPLAY","BIGTAKA","WINBAJI","KHELAGHOR","SUPERBAJI","BAJILIVE","AGUN88"];
const STATS = [
  { value:"24+",   label:"LIVE PLATFORMS",  gFrom:"#1FC186", gTo:"#4EEAA8" },
  { value:"12K+",  label:"CASINO GAMES",    gFrom:"#1FC186", gTo:"#34D399" },
  { value:"50+",   label:"GAME PROVIDERS",  gFrom:"#34D399", gTo:"#10B981" },
  { value:"100+",  label:"PAYMENT METHODS", gFrom:"#1FC186", gTo:"#059669" },
  { value:"99.9%", label:"UPTIME",          gFrom:"#4EEAA8", gTo:"#1FC186" },
  { value:"24/7",  label:"SUPPORT DESK",    gFrom:"#34D399", gTo:"#1FC186" },
];
const PLATFORMS = [
  { name:"NextBaji",        sub:"nextbaji.b2clive.shop",       emoji:"🎰", color:"#F59E0B", tag:"CASINO & BETTING",  desc:"Next-gen casino and sports betting with 12,000+ games, live dealers, game control panel, and international payment gateway." },
  { name:"Krikiya",         sub:"krikiya.b2clive.shop",        emoji:"🎯", color:"#A855F7", tag:"SPORTS BETTING",    desc:"Complete sports betting solution with 12,000+ games, cricket focus, game control options, and international payments." },
  { name:"MCW Letest",      sub:"mcwletest.b2clive.shop",      emoji:"🎮", color:"#06B6D4", tag:"CASINO & BETTING",  desc:"Latest MCW edition with 12,000+ games, enhanced UI, game control dashboard, and international payment integration." },
  { name:"Crickex",         sub:"crickex.b2clive.shop",        emoji:"🏏", color:"#22C55E", tag:"SPORTS BETTING",    desc:"Premier cricket exchange with 12,000+ games, real-time match data, full game control, and international payment gateway." },
  { name:"SuperBaji",       sub:"superbaji.b2clive.shop",      emoji:"⚡", color:"#EF4444", tag:"CASINO & BETTING",  desc:"Premium casino platform with proven reliability, game control dashboard, and international payment support." },
  { name:"GrapWin",         sub:"grapwin.b2clive.shop",        emoji:"💎", color:"#A855F7", tag:"CASINO",            desc:"Fresh casino with 12,000+ games, crash games, instant wins, game control panel, and international payment gateway." },
  { name:"GrapWin Green",   sub:"grapwingreen.b2clive.shop",   emoji:"🍀", color:"#22C55E", tag:"CASINO",            desc:"Green edition with 12,000+ games, eco-themed design, game control dashboard, and international payment gateway." },
  { name:"DarazPlay White", sub:"darazplaywhite.b2clive.shop", emoji:"🤍", color:"#94A3B8", tag:"CASINO",            desc:"Clean white-label edition with 12,000+ games, game control panel, international payments, and 24/7 support." },
  { name:"MaleBet",         sub:"malebet.b2clive.shop",        emoji:"⚽", color:"#F59E0B", tag:"SPORTS BETTING",    desc:"Sports-first betting with 12,000+ games, deep football coverage, game control options, and international payments." },
  { name:"DarazPlay Black", sub:"darazplayblack.b2clive.shop", emoji:"🖤", color:"#475569", tag:"CASINO",            desc:"Dark-themed premium casino with 12,000+ games, game control, and full international payment integration." },
  { name:"BajiLive",        sub:"bajilive.b2clive.shop",       emoji:"🔴", color:"#EF4444", tag:"CASINO & BETTING",  desc:"Live-first platform with 12,000+ games, real-time sports, game control options, and international payment gateway." },
  { name:"Agun88",          sub:"agun88.b2clive.shop",         emoji:"🔥", color:"#F97316", tag:"SPORTS BETTING",    desc:"Sports betting powerhouse with 12,000+ games, international payment gateway, and 24/7 dedicated support." },
  { name:"BajiBD",          sub:"bajibd.shop",                 emoji:"🏆", color:"#06B6D4", tag:"CASINO & BETTING",  desc:"Bangladesh's leading casino & sports betting with 12,000+ games, game control, and international payments." },
  { name:"CK444",           sub:"ck444.b2clive.shop",          emoji:"🎲", color:"#8B5CF6", tag:"CASINO",            desc:"Premium casino gaming hub with 12,000+ games, full game control panel, and international payment support." },
];
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
const BUILD_FEATURES = [
  { emoji:"🚀", title:"Platform Setup & Launch",           desc:"Complete casino platform deployment with 12,000+ games, payment integration, and custom branding — ready to go live." },
  { emoji:"🎮", title:"Game Control & Management",         desc:"Advanced game control panel for managing game library, RTP settings, provider integration, and player game access in real-time." },
  { emoji:"🌍", title:"International Payment Integration", desc:"Seamless integration of 100+ international & local payment methods — credit cards, e-wallets, bank transfers, mobile banking, and crypto." },
  { emoji:"🛡️", title:"24/7 Technical Support",           desc:"Our support desk never sleeps. Round-the-clock monitoring, troubleshooting, and technical assistance for all your platforms." },
  { emoji:"📊", title:"Operations & Analytics",            desc:"Complete back-office management with player analytics, revenue tracking, risk management, and performance optimization tools." },
  { emoji:"🔧", title:"Ongoing Updates & Maintenance",     desc:"Regular platform updates, new game additions, security patches, and feature enhancements to keep your casino ahead of the competition." },
];
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
const SPEC_COLS = ["NEXTBAJI","MCW","SUPERBAJI","CRICKEX","BAJILIVE"];
const SPEC_ROWS = [
  { feature:"Casino Games",          values:["12,000+","12,000+","12,000+","12,000+","12,000+"] },
  { feature:"Game Control Panel",    values:["✓","✓","✓","✓","✓"] },
  { feature:"Intl. Payment Gateway", values:["✓","✓","✓","✓","✓"] },
  { feature:"Sports Betting",        values:["✓","✓","✓","✓","✓"] },
  { feature:"Live Casino",           values:["✓","✓","✓","✓","✓"] },
  { feature:"Crash Games",           values:["✓","✓","✓","✓","✓"] },
  { feature:"Mobile App",            values:["✓","✓","✓","✓","✓"] },
  { feature:"Crypto Payments",       values:["✓","✓","✓","✓","✓"] },
  { feature:"24/7 Support",          values:["✓","✓","✓","✓","✓"] },
  { feature:"VIP Program",           values:["✓","✓","✓","✓","✓"] },
];
const FAQS = [
  { q:"What types of platforms do you offer?",         a:"We offer 24+ fully managed iGaming platforms covering casino, sports betting, live casino, crash games, and hybrid solutions. Each platform includes 12,000+ games, game control panel, and international payment gateway." },
  { q:"How many games are available on each platform?",a:"Every platform comes with 12,000+ casino games including slots, live dealers, table games, crash games, sports betting, and instant wins from 50+ top-tier providers." },
  { q:"What is the Game Control Panel?",               a:"The Game Control Panel is a comprehensive dashboard that allows you to manage your game library, configure RTP settings, integrate new providers, and control player access — all in real-time." },
  { q:"What payment methods are supported?",           a:"We support 100+ international and local payment methods including credit/debit cards, e-wallets, bank transfers, mobile banking, and all major cryptocurrencies." },
  { q:"Do you provide complete platform management?",  a:"Yes. We handle everything from setup and launch to daily operations, technical support, updates, security patches, and ongoing optimization." },
  { q:"How long does it take to go live?",             a:"Most platforms can be deployed and go live within 2–4 weeks. Our team handles all technical setup, payment integration, and game configuration." },
];
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

/* ================================================================
   NETWORK PARTICLES CANVAS
================================================================ */
function NetworkParticles() {
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
}

/* ================================================================
   ORBIT HERO  — scales with container size via ResizeObserver
================================================================ */
function OrbitHero() {
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
  );
}

/* ================================================================
   BUBBLE BG
================================================================ */
function BubbleBg() {
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
  return(
    <div className="bubble-bg" aria-hidden="true">
      {bRef.current.map((b,i)=>{
        const op=.05+Math.sin(b.phase)*.04+(b.size>4?.08:.04);
        const col=b.size>4.5?`rgba(168,85,247,${op})`:b.size>3?`rgba(99,102,241,${op})`:`rgba(255,255,255,${op})`;
        return<div key={i} className="bubble-bg__dot" style={{left:`${b.x}%`,top:`${b.y}%`,width:b.size,height:b.size,background:col,filter:b.size>4?"blur(1px)":"none"}}/>;
      })}
    </div>
  );
}

/* ================================================================
   TICKER
================================================================ */
function Ticker() {
  const items=[...TICKER_ITEMS,...TICKER_ITEMS,...TICKER_ITEMS];
  return(
    <div id="ticker" className="ticker">
      <div className="ticker__track">{items.map((t,i)=><span key={i} className="ticker__item">• {t}</span>)}</div>
    </div>
  );
}

/* ================================================================
   SECTION HEADER
================================================================ */
function SectionHeader({tag,title,subtitle,center=false}){
  return(
    <header className={`sec-head${center?" sec-head--center":""}`}>
      <div className="sec-head__tag-row">
        <div className="sec-head__tag-line"/>
        <span className="sec-head__tag-text">{tag}</span>
      </div>
      <h2 className="sec-head__title">{title}</h2>
      {subtitle&&<p className="sec-head__subtitle">{subtitle}</p>}
    </header>
  );
}

/* ================================================================
   MAIN APP
================================================================ */
/* ================================================================
   AUTH MODAL — Login + Registration
   Security: input sanitization, rate-limit attempt tracking,
   XSS-safe value handling, no eval/innerHTML
================================================================ */

/* ── Security helpers ── */
const sanitize     = (s) => String(s).replace(/[<>"'`]/g, "");
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
const isStrongPass = (p) => p.length >= 8 && /[A-Z]/.test(p) && /[0-9]/.test(p);
const isValidPhone = (p) => /^[+\d\s\-()]{7,20}$/.test(p.trim());
const isValidName  = (n) => n.trim().length >= 2 && !/[<>"'`{}\\]/.test(n);

/* ── Attempt rate limiter (in-memory, resets on reload) ── */
const ATTEMPT_LIMIT = 5;
const LOCK_SECONDS  = 60;
const attemptStore  = { count: 0, lockedUntil: 0 };

function isLocked() {
  if (attemptStore.lockedUntil > Date.now()) return true;
  return false;
}
function recordFailedAttempt() {
  attemptStore.count++;
  if (attemptStore.count >= ATTEMPT_LIMIT) {
    attemptStore.lockedUntil = Date.now() + LOCK_SECONDS * 1000;
    attemptStore.count = 0;
  }
}
function resetAttempts() { attemptStore.count = 0; attemptStore.lockedUntil = 0; }

/* ── LOGIN FORM ── */


/* ── MAIN MODAL WRAPPER ── */
function AuthModal({ open, onClose, defaultTab = "login" }) {
  const [tab,      setTab]      = useState(defaultTab);
  const [prevTab,  setPrevTab]  = useState(null);
  const [animKey,  setAnimKey]  = useState(0);
  const [dir,      setDir]      = useState("left"); // slide direction
  const [done,     setDone]     = useState(false);
  const overlayRef = useRef(null);

  /* sync tab when modal reopens */
  useEffect(() => {
    if (open) { setTab(defaultTab); setPrevTab(null); setDone(false); setAnimKey(k => k+1); }
  }, [open, defaultTab]);

  /* Tab switch with direction */
  const switchTab = (next) => {
    if (next === tab) return;
    setDir(next === "reg" ? "left" : "right"); // login→reg = slide left, reg→login = slide right
    setPrevTab(tab);
    setAnimKey(k => k + 1);
    setTab(next);
    setDone(false);
  };

  /* ESC to close */
  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleOverlay = (e) => { if (e.target === overlayRef.current) onClose(); };

  return (
    <div
      ref={overlayRef}
      id="auth-modal-overlay"
      className="auth-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={tab === "login" ? "Login dialog" : "Registration dialog"}
      onClick={handleOverlay}
    >
      <div className="auth-modal" id="auth-modal">
        {/* Close */}
        <button className="auth-close" onClick={onClose} aria-label="Close dialog">✕</button>

        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title">Welcome</h2>
          <p className="auth-subtitle">Login or create an account to continue</p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "login"}
            className={`auth-tab${tab === "login" ? " auth-tab--active" : ""}`}
            onClick={() => switchTab("login")}
          >Login</button>
          <button
            role="tab"
            aria-selected={tab === "reg"}
            className={`auth-tab${tab === "reg" ? " auth-tab--active" : ""}`}
            onClick={() => switchTab("reg")}
          >Registration</button>
        </div>

        {/* Slide viewport */}
        <div className="auth-slide-viewport">
          <div
            key={animKey}
            className={`auth-slide-content auth-slide-content--${dir}`}
          >
            {done ? (
              <div className="auth-success">
                <div className="auth-success__icon">✅</div>
                <h3>{tab === "login" ? "Logged in!" : "Account Created!"}</h3>
                <p>{tab === "login" ? "Welcome back!" : "Your account has been created successfully."}</p>
                <button className="auth-submit" onClick={onClose}>Continue</button>
              </div>
            ) : tab === "login" ? (
              <LoginForm onSuccess={() => setDone(true)} />
            ) : (
              <RegForm onSuccess={() => setDone(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeNav,  setActiveNav]  = useState("");
  const [openFaq,    setOpenFaq]    = useState(null);
  const [authOpen,   setAuthOpen]   = useState(false);
  const [authTab,    setAuthTab]    = useState("login");

  const openAuth = (tab = "login") => { setAuthTab(tab); setAuthOpen(true); };

  /* navbar scroll detection */
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  /* close drawer on desktop resize */
  useEffect(()=>{
    const fn=()=>{ if(window.innerWidth>1024) setMenuOpen(false); };
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);

  /* close drawer on outside click */
  useEffect(()=>{
    if(!menuOpen) return;
    const fn=(e)=>{
      const nav=document.getElementById("navbar");
      const drawer=document.getElementById("mobile-drawer");
      if(nav&&!nav.contains(e.target)&&drawer&&!drawer.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[menuOpen]);

  const goTo=(href)=>{
    document.querySelector(href)?.scrollIntoView({behavior:"smooth"});
    setActiveNav(href);
    setMenuOpen(false);
  };

  return (
    <div id="app">
      <BubbleBg/>

      {/* ════════════ AUTH MODAL ════════════ */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />

      {/* ════════════ NAVBAR ════════════ */}
      <nav id="navbar"
        className={`navbar${scrolled?" navbar--scrolled":""}`}
        role="navigation" aria-label="Main navigation">

        {/* Logo */}
        <div className="navbar__logo"
          onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
          role="button" tabIndex={0}
          onKeyDown={e=>e.key==="Enter"&&window.scrollTo({top:0,behavior:"smooth"})}>

          <span className="navbar__logo-text">
            <span className="navbar__logo-brand" >
               <img src="logo.png" style={{width: '200px', height: 'auto', marginTop: '20px'}}/>
            </span>
          </span>
        </div>

        {/* Desktop pill */}
        <div className="navbar__menu" role="menubar">
          {NAV_LINKS.map(l=>(
            <a key={l.label} href={l.href}
              className={`navbar__link${activeNav===l.href?" navbar__link--active":""}`}
              role="menuitem"
              onClick={e=>{e.preventDefault();goTo(l.href);}}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen?" navbar__hamburger--open":""}`}
          onClick={()=>setMenuOpen(o=>!o)}
          aria-label={menuOpen?"Close menu":"Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer">
          <span className="navbar__hamburger-line"/>
          <span className="navbar__hamburger-line"/>
          <span className="navbar__hamburger-line"/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div id="mobile-drawer"
        className={`navbar__drawer${menuOpen?" navbar__drawer--open":""}`}
        role="menu" aria-hidden={!menuOpen}>
        {NAV_LINKS.map(l=>(
          <a key={l.label} href={l.href}
            className={`navbar__drawer-link${activeNav===l.href?" navbar__drawer-link--active":""}`}
            role="menuitem"
            onClick={e=>{e.preventDefault();goTo(l.href);}}>
            {l.label}
          </a>
        ))}
      </div>

      {/* ════════════ HERO ════════════ */}
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

      {/* ════════════ TICKER ════════════ */}
      <Ticker/>

      {/* ════════════ STATS ════════════ */}
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

      {/* ════════════ PLATFORMS ════════════ */}
      <section id="platforms" className="section">
        <div className="container">
          <SectionHeader
            tag="OUR PLATFORMS"
            title={<>Casino &amp; Betting <span className="text-primary">Platforms</span></>}
            subtitle="Explore our complete collection of premium casino and betting platforms — each one built for performance and reliability."
          />
          <div className="platforms__grid">
            {PLATFORMS.map((p,i)=>(
              <article key={i} className="platform-card" id={`platform-${p.name.toLowerCase().replace(/\s+/g,"-")}`}>
                <div className="platform-card__header">
                  <div className="platform-card__icon" style={{background:`${p.color}1a`,border:`1px solid ${p.color}35`}}>{p.emoji}</div>
                  <div><div className="platform-card__name">{p.name}</div><div className="platform-card__sub">{p.sub}</div></div>
                </div>
                <span className="platform-card__tag" style={{background:`${p.color}18`,color:p.color}}>{p.tag}</span>
                <p className="platform-card__desc">{p.desc}</p>
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

      {/* ════════════ SOLUTIONS ════════════ */}
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

      {/* ════════════ BUILD / MANAGE ════════════ */}
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

      {/* ════════════ LIVE STATUS ════════════ */}
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

      {/* ════════════ SPECS ════════════ */}
      <section id="specs" className="section">
        <div className="container">
          <SectionHeader
            tag="COMPARISON"
            title={<>Platform <span className="text-primary">Specifications</span></>}
            subtitle="Compare features across our top platforms to find the perfect fit."
          />
          <div className="specs-wrapper">
            <div className="specs-table" role="table">
              <div className="specs-table__head" role="row"
                style={{display:"grid",gridTemplateColumns:`170px repeat(${SPEC_COLS.length},1fr)`}}>
                <div className="specs-table__cell--label" role="columnheader">FEATURE</div>
                {SPEC_COLS.map((c,i)=><div key={i} className="specs-table__cell--col" role="columnheader">{c}</div>)}
              </div>
              {SPEC_ROWS.map((row,i)=>(
                <div key={i} className={`specs-table__row${i%2===1?" specs-table__row--alt":""}`} role="row"
                  style={{display:"grid",gridTemplateColumns:`170px repeat(${SPEC_COLS.length},1fr)`}}>
                  <div className="specs-table__cell--label" role="cell">{row.feature}</div>
                  {row.values.map((v,j)=>(
                    <div key={j} role="cell"
                      className={v==="✓"?"specs-table__cell--check":"specs-table__cell--value"}>
                      {v}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
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

      {/* ════════════ CTA ════════════ */}
      <section id="cta" className="footer-cta">
        <div className="container" style={{maxWidth:820,textAlign:"center"}}>
          <h2 className="footer-cta__title">
            COMPLETE <span className="text-primary">iGAMING</span>
            <br/>
            <span className="text-gradient">SOLUTIONS</span> FOR YOUR BUSINESS
          </h2>
          <p className="footer-cta__desc">
            24+ platforms, 12,000+ games, game control, international payments &amp;
            24/7 dedicated support — all under one roof.
          </p>
          <button className="btn btn--primary btn--lg" onClick={()=>goTo("#platforms")}>
            EXPLORE ALL PLATFORMS →
          </button>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer id="footer" className="footer" role="contentinfo">
        <div className="footer__inner">
          <div className="footer__grid">
            <div id="footer-brand">
              <div className="footer__brand-logo">
                <div className="footer__brand-icon">🎰</div>
                <span className="footer__brand-name">
                  <span className="navbar__logo-brand">b2clive</span>
                  <span className="navbar__logo-domain">.shop</span>
                </span>
              </div>
              <p className="footer__brand-desc">
                Your complete iGaming solutions provider. 24+ platforms, 12,000+ games,
                game control, international payments &amp; 24/7 support.
              </p>
            </div>
            <nav id="footer-links" aria-label="Footer quick links">
              <div className="footer__col-title">QUICK LINKS</div>
              {["Platforms","Features","Solutions","Live Status","Specs","FAQ"].map(l=>(
                <a key={l} href={`#${l.toLowerCase().replace(" ","-")}`}
                  className="footer__link"
                  onClick={e=>{e.preventDefault();goTo(`#${l.toLowerCase().replace(" ","-")}`);}}>
                  {l}
                </a>
              ))}
            </nav>
            <nav id="footer-platforms" aria-label="Top platforms">
              <div className="footer__col-title">TOP PLATFORMS</div>
              {["NextBaji","MCW","SuperBaji","BajiLive","Crickex"].map(p=>(
                <span key={p} className="footer__link">{p}</span>
              ))}
            </nav>
          </div>
          <div className="footer__bottom">
            <span className="footer__copyright">© 2026 b2clive.shop — All rights reserved.</span>
            <span className="footer__copyright">Complete iGaming Solutions &amp; Platform Management</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
