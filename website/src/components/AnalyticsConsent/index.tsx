import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {readConsent, saveConsent, startClarity, stopClarity, type AnalyticsConsent} from '@site/src/utils/clarity';
import styles from './styles.module.css';

export default function AnalyticsPreferences(): ReactNode {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const settingsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(readConsent() === null);
    setReady(true);
    startClarity();
  }, []);

  function choose(consent: AnalyticsConsent): void {
    if (!saveConsent(consent)) {
      setError(true);
      return;
    }
    setError(false);
    setOpen(false);
    settingsButton.current?.focus();
    if (consent === 'accepted') {
      startClarity();
    } else {
      stopClarity();
    }
  }

  if (!ready) {
    return null;
  }

  return (
    <div data-clarity-mask="true">
      <button
        ref={settingsButton}
        type="button"
        className={styles.settings}
        aria-expanded={open}
        aria-controls="analytics-preferences"
        onClick={() => setOpen(!open)}>
        Analytics preferences
      </button>
      {open && (
        <section
          id="analytics-preferences"
          className={styles.banner}
          aria-labelledby="analytics-heading">
          <h2 id="analytics-heading">Optional analytics</h2>
          <p>
            With your permission, Microsoft Clarity uses cookies, heatmaps and session
            recordings to help me understand how this blog is used. Advertising consent
            stays off. You can change your choice at any time. <Link to="/privacy">Privacy details</Link>
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose('accepted')}>Accept analytics</button>
            <button type="button" onClick={() => choose('declined')}>Decline analytics</button>
            {readConsent() !== null && (
              <button type="button" onClick={() => {
                setOpen(false);
                settingsButton.current?.focus();
              }}>Close</button>
            )}
          </div>
          {error && (
            <p role="alert">
              Your browser could not save your preference. Please allow this site to save
              its preference cookie and try again. Analytics has not been changed.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
