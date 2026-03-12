import { useState } from "react";
import axios from "axios";
import {baseUrl,redirectUrl} from "../config.js";


function LoginForm() {
    const [fields, setFields] = useState({ email: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lockMsg, setLockMsg] = useState("");

    const set = (k, v) => {
        setFields(f => ({ ...f, [k]: v }));
        setLockMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${baseUrl}/api/login`,
                {
                    email: fields.email,
                    password: fields.password
                }
            );

            const { token, user } = res.data;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to Next.js domain
            window.location.href = `${redirectUrl}/auth/sso-login?token=${token}`;

        } catch (error) {
            setLockMsg(
                error.response?.data?.message || "Invalid email or password"
            );
        }

        setLoading(false);
    };

    return (
        <form id="login-form" className="auth-form" onSubmit={handleSubmit} noValidate autoComplete="off">

            <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">Email</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">✉</span>
                    <input
                        id="login-email"
                        className="auth-input"
                        type="email"
                        placeholder="Enter your email"
                        value={fields.email}
                        onChange={e => set("email", e.target.value)}
                        maxLength={120}
                        autoComplete="email"
                    />
                </div>
            </div>

            <div className="auth-field">
                <label className="auth-label" htmlFor="login-pass">Password</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input
                        id="login-pass"
                        className="auth-input"
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={fields.password}
                        onChange={e => set("password", e.target.value)}
                        maxLength={128}
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="auth-eye"
                        onClick={() => setShowPass(s => !s)}
                        aria-label={showPass ? "Hide password" : "Show password"}
                    >
                        {showPass ? "🙈" : "👁"}
                    </button>
                </div>
            </div>

            <div className="auth-row">
                <label className="auth-check">
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                    <span>Remember me</span>
                </label>
                <button type="button" className="auth-forgot">Forgot password?</button>
            </div>

            {lockMsg && <p className="auth-error auth-error--lock" role="alert">🔒 {lockMsg}</p>}

            <button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
                {loading ? <span className="auth-spinner" /> : "Login"}
            </button>

        </form>
    );
}

export default LoginForm;