import { useState, useEffect, useRef } from "react";
import "./index.css";
import Footer from "./components/layout/Footer.jsx";
import FooterCta from "./components/layout/FooterCta.jsx";
import Faq from "./components/Faq.jsx";
import Specs from "./components/Specs.jsx";
import LiveStatus from "./components/LiveStatus.jsx";
import Features from "./components/Features.jsx";
import Solutions from "./components/Solutions.jsx";
import Platforms from "./components/Platforms.jsx";
import Stats from "./components/Stats.jsx";
import Ticker from "./components/Ticker.jsx";
import Hero from "./components/Hero.jsx";
import BubbleBg from "./components/BubbleBg.jsx";
import MobileDrawer from "./components/layout/MobileDrawer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import AuthModal from "./components/AuthModal.jsx";

const NAV_LINKS = [
  { label:"Platforms",   href:"#platforms"   },
  { label:"Features",    href:"#features"    },
  { label:"Solutions",   href:"#solutions"   },
  { label:"Live Status", href:"#live-status" },
  { label:"Specs",       href:"#specs"       },
  { label:"FAQ",         href:"#faq"         },
];


export default function App() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeNav,  setActiveNav]  = useState("");

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
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />
      <Navbar scrolled={scrolled}  NAV_LINKS={NAV_LINKS} menuOpen={menuOpen} activeNav={activeNav} setMenuOpen={setMenuOpen}/>
      <MobileDrawer NAV_LINKS={NAV_LINKS} menuOpen={menuOpen} activeNav={activeNav}/>
      <Hero/>
      <Ticker/>
      <Stats/>
      <Platforms openAuth={openAuth} />
      <Solutions />
      <Features />
      <LiveStatus />
      <Specs/>
      <Faq/>
      <FooterCta goTo={goTo} />
      <Footer goTo={goTo} />
    </div>
  );
}
