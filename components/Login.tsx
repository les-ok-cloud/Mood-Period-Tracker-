
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Login: React.FC = () => {
  const { signInWithEmail, signUpWithEmail, signInAsGuest, sendPasswordResetEmail } = useAuth();
  const { t } = useLanguage();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [view, setView] = useState<'login' | 'forgotPassword'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthAction = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setMessage('');
      if (!email || !password) {
          setError(t.errorBothFields);
          return;
      }
      setIsSubmitting(true);
      try {
          if (isSignUp) {
              await signUpWithEmail(email, password);
          } else {
              await signInWithEmail(email, password);
          }
      } catch (err: any) {
          switch(err.code) {
              case 'auth/email-already-in-use':
                  setError(t.errorEmailInUse);
                  break;
              case 'auth/weak-password':
                  setError(t.errorWeakPassword);
                  break;
              case 'auth/user-not-found':
              case 'auth/wrong-password':
              case 'auth/invalid-credential':
                  setError(t.errorInvalidCredentials);
                  break;
              default:
                  setError(t.errorUnexpected);
                  console.error(err);
          }
      } finally {
        setIsSubmitting(false);
      }
  };
  
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError(t.errorEnterEmail);
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(email);
      setMessage(t.resetLinkSentSuccess);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError(t.errorUserNotFound);
      } else {
        setError(t.errorUnexpected);
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForgotPasswordView = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-700 mt-8">{t.resetPasswordTitle}</h2>
      <p className="text-slate-500 mt-2 text-base sm:text-lg">{t.resetPasswordInstructions}</p>
      <form onSubmit={handlePasswordReset} className="space-y-4 text-left mt-6">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="w-full p-3 bg-slate-100 text-slate-800 placeholder:text-slate-400 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200"
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg disabled:bg-slate-400"
        >
          {isSubmitting ? t.processingButton : t.sendResetLinkButton}
        </button>
      </form>
       <div className="mt-6">
          <button onClick={() => { setView('login'); setError(''); setMessage(''); }} className="text-sm text-purple-600 hover:underline">
            {t.backToLogin}
          </button>
      </div>
    </>
  );

  const renderLoginView = () => (
    <>
      <p className="text-slate-500 mt-4 text-base sm:text-lg">
        {t.loginSubtitle}
      </p>
      <div className="mt-8 space-y-4">
        <form onSubmit={handleAuthAction} className="space-y-4 text-left">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full p-3 bg-slate-100 text-slate-800 placeholder:text-slate-400 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200"
            required
          />
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full p-3 pr-10 bg-slate-100 text-slate-800 placeholder:text-slate-400 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-purple-600 focus:outline-none"
              aria-label={showPassword ? t.hidePasswordAria : t.showPasswordAria}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
            </button>
          </div>
          <div className="text-right -mt-2">
            <button
              type="button"
              onClick={() => { setView('forgotPassword'); setError(''); setMessage(''); setPassword(''); }}
              className="text-sm font-semibold text-purple-600 hover:underline"
            >
              {t.forgotPasswordPrompt}
            </button>
          </div>
           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg disabled:bg-slate-400"
          >
            {isSubmitting ? t.processingButton : (isSignUp ? t.signUpButton : t.signInButton)}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          {isSignUp ? t.haveAccountPrompt : t.noAccountPrompt}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-semibold text-purple-600 hover:underline ml-1">
            {isSignUp ? t.signInButton : t.signUpButton}
          </button>
        </p>
      </div>
      <div className="mt-6">
          <button onClick={signInAsGuest} disabled={isSubmitting} className="text-sm text-purple-600 hover:underline font-semibold">
              {t.continueAsGuest}
          </button>
      </div>
    </>
  );
  
  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="relative text-center card-padding bg-white/80 backdrop-blur-sm rounded-2xl shadow-compact max-w-md w-full mx-3 animate-fade-in-up">
        <div className="absolute bottom-4 right-4">
          <LanguageSwitcher />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-400">
          <span>{t.title_part1}</span>
          <span className="font-handwritten text-red-500 text-5xl font-normal">
              {' '}{t.title_part2_cycle}
          </span>
          {t.title_part3 && <span>{' '}{t.title_part3}</span>}
        </h1>
        
        {view === 'login' ? renderLoginView() : renderForgotPasswordView()}

      </div>
    </div>
  );
};
