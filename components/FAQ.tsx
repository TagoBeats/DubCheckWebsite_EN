'use client'

import { useState } from 'react'

const FAQS = [
  {
    n: 'Q/01',
    q: 'Welche Plattform-Specs werden unterstützt?',
    a: 'Aktuell unterstützen wir 18 Vorgaben von 7 großen Anbietern. Dazu gehören unter anderem Netflix (inklusive 5.1, Stereo und Atmos-Mixen), EBU R128 für Broadcast, Amazon Prime Video sowie Vorgaben für Apple Music, Spotify und YouTube. Auf Anfrage können wir weitere Plattformen hinzufügen.',
  },
  {
    n: 'Q/02',
    q: 'Wie funktioniert die Dialog-Erkennung?',
    a: 'Bei Plattformen wie Netflix hängt der Loudness-Zielwert davon ab, wie viel Dialog im File ist. DubCheck erkennt automatisch, wo gesprochen wird, und entscheidet dann: Genug Dialog? Messung gegen −27 LKFS. Zu wenig Dialog (z.B. bei Natur-Dokus oder reiner Musik)? Messung gegen den Fallback-Wert −24 LKFS. Im Report steht immer transparent, welcher Modus verwendet wurde und warum.',
  },
  {
    n: 'Q/03',
    q: 'Wie genau sind die Messwerte?',
    a: 'Absolute Präzision hat höchste Priorität. Unsere Messungen sind vollständig normkonform nach ITU-R BS.1770-4 und offiziell gegen das EBU-Referenzmaterial validiert (mit einer Toleranz von ±0.1 LU). Für die True-Peak-Messung nutzen wir ein hochwertiges 4-fach Oversampling.',
  },
  {
    n: 'Q/04',
    q: 'Was passiert mit meinen Audio-Files?',
    a: 'DubCheck läuft lokal, kein Cloud-Upload, keine Server-Verarbeitung. Datenschutz hat oberste priorität. Sie laden Ihre Mixes sicher für unseren QC-Service hoch. Wir führen die Überprüfung direkt im Anschluss durch und liefern Ihnen den fertigen PDF-Report mit allen Messwerten und der Pass/Fail-Bewertung aus.',
  },
  {
    n: 'Q/05',
    q: 'Welche Audio-Formate werden unterstützt?',
    a: 'Wir prüfen gängige, unkomprimierte Delivery-Formate: WAV (PCM 16/24/32-bit), Broadcast Wave (BWAV), RF64 und FLAC. Sie können Mono-, Stereo- und 5.1-Surround-Files anliefern. MP3s oder andere Lossy-Formate werden nicht unterstützt, da diese für Broadcast-Deliveries nicht zugelassen sind.',
  },
  {
    n: 'Q/06',
    q: 'Können sich Specs ändern?',
    a: 'Ja, und DubCheck ist dafür gebaut. Alle Plattform-Specs sind als Dateien definiert mit Versionsnummer und Quellenangabe. Wenn Netflix die Delivery Bible aktualisiert, wird die Datei angepasst. Die Spec-Version steht in jedem Report.',
  },
  {
    n: 'Q/07',
    q: 'Warum DubCheck statt iZotope Insight oder Nugen?',
    a: 'Insight und Nugen sind super Metering-Tools - aber sie zeigen Ihnen Messwerte an, die Sie selbst ablesen und gegen die richtige Spec abgleichen müssen. DubCheck macht beides automatisch: messen und gegen die aktuelle Delivery-Spec prüfen. Am Ende bekommen Sie einen fertigen PDF-Report mit Pass/Fail für jeden einzelnen Check. Kein manuelles Übertragen, kein Nachschlagen in der Delivery Bible.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-[120px]" id="faq">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-dc-ink3">§ 07 · Fragen</div>
          <h2 className="text-[28px] md:text-[44px] leading-[1.12] md:leading-[1.08] tracking-[-0.025em] mt-[14px] font-semibold max-w-[18ch]">
            Häufig gestellte Fragen.
          </h2>
        </div>
        <p className="max-w-[36ch] text-dc-ink2 text-[15px] md:shrink-0">
          Falls die Antwort nicht dabei ist: Die Docs unter{' '}
          <a href="https://docs.dubcheck.io" className="font-mono text-dc-ink2 underline underline-offset-2 hover:text-dc-ink transition-colors" target="_blank" rel="noopener noreferrer">docs.dubcheck.io</a> enthalten das
          vollständige Schema, die Messgrundlage und ein Changelog für jeden Profil-Bump.
        </p>
      </div>

      {/* Accordion */}
      <div className="border-t border-white/[0.08]">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.n} className="border-b border-white/[0.08]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between py-[22px] px-[4px] text-left group cursor-pointer"
              >
                <div className="flex items-center gap-[14px]">
                  <span className="font-mono text-[12px] text-dc-ink3 shrink-0 w-[36px]">{faq.n}</span>
                  <span className="text-[15px] font-semibold tracking-[-0.005em]">{faq.q}</span>
                </div>
                <span
                  className="text-dc-ink3 text-[20px] leading-none shrink-0 ml-4 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-dc-ink2 text-[13.5px] leading-[1.6] pl-[54px] pr-[40px] pb-[22px]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
