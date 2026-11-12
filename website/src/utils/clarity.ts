const PROJECT_ID = 'zcdex5g68p';
const CONSENT_COOKIE = 'site_analytics';
const SIX_MONTHS = 60 * 60 * 24 * 180;

export type AnalyticsConsent = 'accepted' | 'declined';

type Clarity = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: Clarity;
  }
}

export function readConsent(): AnalyticsConsent | null {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
    ?.split('=')[1];
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function saveConsent(consent: AnalyticsConsent): boolean {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${consent}; Max-Age=${SIX_MONTHS}; Path=/; SameSite=Lax${secure}`;
  return readConsent() === consent;
}

export function startClarity(): void {
  if (
    process.env.NODE_ENV !== 'production' ||
    !['www.lheureuxlabs.com', 'lheureuxlabs.com'].includes(window.location.hostname) ||
    readConsent() !== 'accepted' ||
    document.getElementById('clarity-script')
  ) {
    return;
  }

  const clarity: Clarity = window.clarity ?? function (...args: unknown[]) {
    (clarity.q ??= []).push(args);
  };
  window.clarity = clarity;
  clarity('consentv2', {analytics_Storage: 'granted', ad_Storage: 'denied'});

  const script = document.createElement('script');
  script.id = 'clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
  script.onerror = () => {
    console.warn('Microsoft Clarity could not load; analytics is unavailable.');
  };
  document.head.appendChild(script);
}

export function stopClarity(): void {
  if (!window.clarity) {
    return;
  }

  window.clarity('consentv2', {analytics_Storage: 'denied', ad_Storage: 'denied'});
  // Microsoft's cookie-erasure API also ends the current session.
  window.clarity('consent', false);
  // Unload the SDK entirely so it cannot continue in cookieless mode.
  window.location.reload();
}
