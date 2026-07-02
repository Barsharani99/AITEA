'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './event-registration.css';

// Helper to get nested properties by dot notation (e.g., 'nav.about')
function getNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return null;
  return keyPath.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

function EventRegistrationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventKey = searchParams.get('event') || '';

  const [translations, setTranslations] = useState({});
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const loadLang = async (currentLang) => {
      try {
        const res = await fetch(`/locales/${currentLang}.json`);
        if (res.ok) {
          const data = await res.json();
          setTranslations(data);
        }
      } catch (e) {
        console.error('Failed to load translations:', e);
      }
    };

    const initialLang = typeof window !== 'undefined' ? (window.aitea_i18n?.currentLang() || localStorage.getItem('aitea_lang') || 'en') : 'en';
    setLang(initialLang);
    loadLang(initialLang);

    const handleLangChange = (e) => {
      const newLang = e.detail.lang;
      setLang(newLang);
      loadLang(newLang);
    };

    window.addEventListener('languageChanged', handleLangChange);
    return () => {
      window.removeEventListener('languageChanged', handleLangChange);
    };
  }, []);

  const t = (key) => {
    if (!key) return '';
    return getNestedValue(translations, key) || key;
  };

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [participants, setParticipants] = useState('1');
  const [notes, setNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Errors & submission state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field validation
  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'fullName') {
      errorMsg = value.trim() ? '' : t('event_reg.validation_required');
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = t('event_reg.validation_required');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = t('event_reg.validation_email');
      }
    } else if (name === 'phone') {
      if (!value) {
        errorMsg = t('event_reg.validation_required');
      } else if (value.length !== 10) {
        errorMsg = t('event_reg.validation_phone');
      }
    } else if (name === 'acceptTerms') {
      errorMsg = value ? '' : t('event_reg.validation_required');
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    // Prevent alphabets, special characters, spaces, and symbols from being entered
    const cleaned = val.replace(/\D/g, '');
    // Ensure user cannot enter more than 10 digits
    const limited = cleaned.slice(0, 10);
    setPhone(limited);

    // If fewer than 10 digits are entered, display the validation message
    if (limited.length > 0 && limited.length < 10) {
      setErrors(prev => ({ ...prev, phone: t('event_reg.validation_phone') }));
    } else if (!limited) {
      setErrors(prev => ({ ...prev, phone: t('event_reg.validation_required') }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handlePhonePaste = (e) => {
    const pastedData = e.clipboardData.getData('text');
    // Sanitize the pasted value to contain only numeric digits
    const cleaned = pastedData.replace(/\D/g, '');
    // Support copy-paste only if the pasted value contains exactly 10 numeric digits; otherwise reject
    if (cleaned.length === 10) {
      setPhone(cleaned);
      setErrors(prev => ({ ...prev, phone: '' }));
    } else {
      e.preventDefault();
    }
  };

  const handlePhoneBlur = () => {
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: t('event_reg.validation_required') }));
    } else if (phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: t('event_reg.validation_phone') }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = t('event_reg.validation_required');
    if (!email.trim()) {
      newErrors.email = t('event_reg.validation_required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('event_reg.validation_email');
    }
    if (!phone) {
      newErrors.phone = t('event_reg.validation_required');
    } else if (phone.length !== 10) {
      newErrors.phone = t('event_reg.validation_phone');
    }
    if (!acceptTerms) newErrors.acceptTerms = t('event_reg.validation_required');

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid && phone.length === 10) {
      setIsSubmitted(true);
    }
  };

  const eventName = eventKey ? t(eventKey) : '';
  const isPhoneValid = phone.length === 10;

  if (isSubmitted) {
    return (
      <>
        <app-header></app-header>
        <main className="event-reg-shell" style={{ paddingTop: '118px' }}>
          <section className="event-reg-card">
            <div className="event-reg-success">
              <div className="event-reg-success-icon" aria-hidden="true">✓</div>
              <h1 className="event-reg-success-title">{t('event_reg.success_title')}</h1>
              <p className="event-reg-success-desc">
                {t('event_reg.success_desc')}
                {eventName && (
                  <strong style={{ display: 'block', marginTop: '10px', color: '#0F1B33' }}>
                    {eventName}
                  </strong>
                )}
              </p>
              <a href="/events" className="event-reg-back-btn">
                ← {t('event_reg.back_to_events')}
              </a>
            </div>
          </section>
        </main>
        <app-footer></app-footer>
      </>
    );
  }

  return (
    <>
      <app-header></app-header>
      <main className="event-reg-shell" style={{ paddingTop: '118px' }}>
        <section className="event-reg-card">
          <header className="event-reg-header">
            <p className="event-reg-eyebrow">AITEA Events</p>
            <h1 className="event-reg-title">{t('event_reg.title')}</h1>
            <p className="event-reg-subtitle">{t('event_reg.subtitle')}</p>
            {eventName && (
              <div className="event-reg-target">
                {eventName}
              </div>
            )}
          </header>

          <form onSubmit={handleSubmit} className="event-reg-form" novalidate>
            <div className="event-reg-grid">
              {/* Full Name */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="fullName">
                  {t('event_reg.field_name')} <span>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    validateField('fullName', e.target.value);
                  }}
                  onBlur={() => validateField('fullName', fullName)}
                  placeholder={t('event_reg.field_name_placeholder')}
                  className={`event-reg-input ${errors.fullName ? 'error' : ''}`}
                  required
                />
                {errors.fullName && (
                  <span className="event-reg-error-text">{errors.fullName}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="email">
                  {t('event_reg.field_email')} <span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField('email', e.target.value);
                  }}
                  onBlur={() => validateField('email', email)}
                  placeholder={t('event_reg.field_email_placeholder')}
                  className={`event-reg-input ${errors.email ? 'error' : ''}`}
                  required
                />
                {errors.email && (
                  <span className="event-reg-error-text">{errors.email}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="phone">
                  {t('event_reg.field_phone')} <span>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  onPaste={handlePhonePaste}
                  onBlur={handlePhoneBlur}
                  placeholder={t('event_reg.field_phone_placeholder')}
                  className={`event-reg-input ${errors.phone ? 'error' : ''}`}
                  maxLength={10}
                  required
                />
                {errors.phone && (
                  <span className="event-reg-error-text">{errors.phone}</span>
                )}
              </div>

              {/* Country */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="country">
                  {t('event_reg.field_country')}
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="event-reg-select"
                >
                  <option value="" disabled>{t('event_reg.field_country_placeholder')}</option>
                  <option value="AT">Austria</option>
                  <option value="IN">India</option>
                  <option value="DE">Germany</option>
                  <option value="CH">Switzerland</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Organization */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="organization">
                  {t('event_reg.field_org')}
                </label>
                <input
                  type="text"
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={t('event_reg.field_org_placeholder')}
                  className="event-reg-input"
                />
              </div>

              {/* Designation */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="designation">
                  {t('event_reg.field_desig')}
                </label>
                <input
                  type="text"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder={t('event_reg.field_desig_placeholder')}
                  className="event-reg-input"
                />
              </div>

              {/* Number of Participants */}
              <div className="event-reg-group">
                <label className="event-reg-label" htmlFor="participants">
                  {t('event_reg.field_participants')}
                </label>
                <select
                  id="participants"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="event-reg-select"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="more">5+ ({t('nav.contact')})</option>
                </select>
              </div>

              {/* Notes */}
              <div className="event-reg-group event-reg-full-width">
                <label className="event-reg-label" htmlFor="notes">
                  {t('event_reg.field_notes')}
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('event_reg.field_notes_placeholder')}
                  rows="3"
                  className="event-reg-textarea"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="event-reg-checkbox-group event-reg-full-width">
                <label className="event-reg-checkbox-label" htmlFor="acceptTerms">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      validateField('acceptTerms', e.target.checked);
                    }}
                    required
                  />
                  <span>
                    I consent to AITEA processing my registration data and accept the Terms &amp; Conditions. <span>*</span>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="event-reg-error-text" style={{ display: 'block' }}>{errors.acceptTerms}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '12px' }}>
              <button
                type="submit"
                disabled={!isPhoneValid}
                className="event-reg-submit-btn"
              >
                {t('event_reg.submit_btn')}
              </button>
            </div>
          </form>
        </section>
      </main>
      <app-footer></app-footer>
    </>
  );
}

export default function EventRegistrationPage() {
  return (
    <Suspense fallback={
      <div className="event-reg-shell">
        <div className="event-reg-card">
          <p>Loading Registration Form...</p>
        </div>
      </div>
    }>
      <EventRegistrationForm />
    </Suspense>
  );
}
