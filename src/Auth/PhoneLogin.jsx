import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth, firebase } from '../firebase';
import './PhoneLogin.css';

export default function PhoneLogin() {
  const [phone, setPhone]         = useState('');
  const [otp, setOtp]             = useState('');
  const [codeSent, setCodeSent]   = useState(false);
  const [confirmation, setConfirm]= useState(null);
  const [error, setError]         = useState('');
  const navigate                  = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' }
      );
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendCode = async () => {
    setError('');
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirm(result);
      setCodeSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyCode = async () => {
    setError('');
    try {
      await confirmation.confirm(otp);
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="left-panel" />
      <div className="right-panel">
        <div className="login-card">
          <h2>Sign in with Mobile</h2>
          {error && <p className="error">{error}</p>}
          <div id="recaptcha-container"></div>

          {!codeSent ? (
            <>
              <input
                className="login-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
              />
              <button className="primary-btn" onClick={sendCode}>
                Send Code
              </button>
            </>
          ) : (
            <>
              <input
                className="login-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button className="primary-btn" onClick={verifyCode}>
                Verify Code
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
