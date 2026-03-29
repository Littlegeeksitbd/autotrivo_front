import React, {useEffect, useRef, useState} from 'react';
import LoginForm from "./LoginForm.jsx";
import RegForm from "./RegForm.jsx";

const AuthModal = ({ open, onClose, defaultTab = "login" }) => {

    const [tab,      setTab]      = useState(defaultTab);
    const [prevTab,  setPrevTab]  = useState(null);
    const [animKey,  setAnimKey]  = useState(0);
    const [dir,      setDir]      = useState("left"); // slide direction
    const [done,     setDone]     = useState(false);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (open) { setTab(defaultTab); setPrevTab(null); setDone(false); setAnimKey(k => k+1); }
    }, [open, defaultTab]);


    const switchTab = (next) => {
        if (next === tab) return;
        setDir(next === "reg" ? "left" : "right"); // login→reg = slide left, reg→login = slide right
        setPrevTab(tab);
        setAnimKey(k => k + 1);
        setTab(next);
        setDone(false);
    };

    useEffect(() => {
        if (!open) return;
        const fn = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [open, onClose]);


    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const handleOverlay = (e) => { if (e.target === overlayRef.current) onClose(); };


    return (
        <>
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
                    <button className="auth-close" onClick={onClose} aria-label="Close dialog">✕</button>

                    <div className="auth-header">
                        <h2 className="auth-title">Welcome</h2>
                        <p className="auth-subtitle">Login or create an account to continue</p>
                    </div>

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
        </>
    );
};

export default AuthModal;


