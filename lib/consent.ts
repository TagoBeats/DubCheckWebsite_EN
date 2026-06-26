export type ConsentState = 'granted' | 'denied' | null

const STORAGE_KEY = 'dc-consent'
export const CONSENT_EVENT = 'dc-consent-change'

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'granted' || v === 'denied' ? v : null
}

export function setConsent(value: 'granted' | 'denied') {
  window.localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

export function clearConsent() {
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
}
