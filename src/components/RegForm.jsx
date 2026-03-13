import React, {useState} from 'react';

function RegForm({ onSuccess }) {
    const [fields,    setFields]    = useState({ name:"", email:"", phone:"", password:"", confirm:"" });
    const [errors,    setErrors]    = useState({});
    const [showPass,  setShowPass]  = useState(false);
    const [showConf,  setShowConf]  = useState(false);
    const [agreed,    setAgreed]    = useState(false);
    const [loading,   setLoading]   = useState(false);

    const sanitize     = (s) => String(s).replace(/[<>"'`]/g, "");
    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
    const isStrongPass = (p) => p.length >= 4 ;
    const isValidPhone = (p) => /^[+\d\s\-()]{7,20}$/.test(p.trim());
    const isValidName  = (n) => n.trim().length >= 2 && !/[<>"'`{}\\]/.test(n);


    const set = (k, v) => {
        setFields(f => ({ ...f, [k]: sanitize(v) }));
        setErrors(e => ({ ...e, [k]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!fields.name)                     errs.name     = "Full name is required";
        else if (!isValidName(fields.name))   errs.name     = "Name contains invalid characters";
        if (!fields.email)                    errs.email    = "Email is required";
        else if (!isValidEmail(fields.email)) errs.email    = "Enter a valid email address";
        if (!fields.phone)                    errs.phone    = "Phone number is required";
        else if (!isValidPhone(fields.phone)) errs.phone    = "Enter a valid phone number";
        if (!fields.password)                 errs.password = "Password is required";
        else if (!isStrongPass(fields.password)) errs.password = "Min 4 chars, 1 uppercase, 1 number";
        if (!fields.confirm)                  errs.confirm  = "Please confirm your password";
        else if (fields.confirm !== fields.password) errs.confirm = "Passwords do not match";
        if (!agreed)                          errs.agreed   = "You must agree to the Terms & Conditions";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setLoading(true);

        try {

            await axios.post(
                `${baseUrl}/api/auth/register`,
                {
                    name: fields.name,
                    email: fields.email,
                    password: fields.password
                }
            );

            alert("Registration successful 🎉");

            onSuccess?.();

        } catch (error) {

            setErrors({
                email: error.response?.data?.message || "Registration failed"
            });

        }

        setLoading(false);
    };

    return (
        <form id="reg-form" className="auth-form" onSubmit={handleSubmit} noValidate autoComplete="off">
            {/* Full Name */}
            <div className="auth-field">
                <label className="auth-label" htmlFor="reg-name">Full Name</label>
                <div className={`auth-input-wrap${errors.name ? " auth-input-wrap--err" : ""}`}>
                    <span className="auth-input-icon">👤</span>
                    <input id="reg-name" className="auth-input" type="text"
                           placeholder="Enter your full name"
                           value={fields.name} onChange={e => set("name", e.target.value)}
                           maxLength={80} autoComplete="name" />
                </div>
                {errors.name && <p className="auth-error" role="alert">⚠ {errors.name}</p>}
            </div>

            {/* Email */}
            <div className="auth-field">
                <label className="auth-label" htmlFor="reg-email">Email</label>
                <div className={`auth-input-wrap${errors.email ? " auth-input-wrap--err" : ""}`}>
                    <span className="auth-input-icon">✉</span>
                    <input id="reg-email" className="auth-input" type="email"
                           placeholder="Enter your email"
                           value={fields.email} onChange={e => set("email", e.target.value)}
                           maxLength={120} autoComplete="email" />
                </div>
                {errors.email && <p className="auth-error" role="alert">⚠ {errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="auth-field">
                <label className="auth-label" htmlFor="reg-phone">Phone Number</label>
                <div className={`auth-input-wrap${errors.phone ? " auth-input-wrap--err" : ""}`}>
                    <span className="auth-input-icon">📞</span>
                    <input id="reg-phone" className="auth-input" type="tel"
                           placeholder="Enter your phone number"
                           value={fields.phone} onChange={e => set("phone", e.target.value)}
                           maxLength={20} autoComplete="tel" />
                </div>
                {errors.phone && <p className="auth-error" role="alert">⚠ {errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="auth-field">
                <label className="auth-label" htmlFor="reg-pass">Password</label>
                <div className={`auth-input-wrap${errors.password ? " auth-input-wrap--err" : ""}`}>
                    <span className="auth-input-icon">🔒</span>
                    <input id="reg-pass" className="auth-input"
                           type={showPass ? "text" : "password"}
                           placeholder="Create a password"
                           value={fields.password} onChange={e => set("password", e.target.value)}
                           maxLength={128} autoComplete="new-password" />
                    <button type="button" className="auth-eye" onClick={() => setShowPass(s => !s)}
                            aria-label={showPass ? "Hide password" : "Show password"}>
                        {showPass ? "🙈" : "👁"}
                    </button>
                </div>
                {errors.password && <p className="auth-error" role="alert">⚠ {errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
                <label className="auth-label" htmlFor="reg-confirm">Confirm Password</label>
                <div className={`auth-input-wrap${errors.confirm ? " auth-input-wrap--err" : ""}`}>
                    <span className="auth-input-icon">🔒</span>
                    <input id="reg-confirm" className="auth-input"
                           type={showConf ? "text" : "password"}
                           placeholder="Confirm your password"
                           value={fields.confirm} onChange={e => set("confirm", e.target.value)}
                           maxLength={128} autoComplete="new-password" />
                    <button type="button" className="auth-eye" onClick={() => setShowConf(s => !s)}
                            aria-label={showConf ? "Hide confirm password" : "Show confirm password"}>
                        {showConf ? "🙈" : "👁"}
                    </button>
                </div>
                {errors.confirm && <p className="auth-error" role="alert">⚠ {errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div className="auth-field">
                <label className={`auth-check${errors.agreed ? " auth-check--err" : ""}`}>
                    <input type="checkbox" checked={agreed} onChange={e => {
                        setAgreed(e.target.checked);
                        setErrors(er => ({ ...er, agreed: "" }));
                    }} />
                    <span>I agree to the <button type="button" className="auth-forgot">Terms &amp; Conditions</button> and <button type="button" className="auth-forgot">Privacy Policy</button></span>
                </label>
                {errors.agreed && <p className="auth-error" role="alert">⚠ {errors.agreed}</p>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
                {loading ? <span className="auth-spinner" /> : "Create Account"}
            </button>
        </form>
    );
}


export default RegForm;