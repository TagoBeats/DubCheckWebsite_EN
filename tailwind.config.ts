import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dc-bg':      '#0E0E10',
        'dc-bg2':     '#121214',
        'dc-surface': '#17171A',
        'dc-surf2':   '#1C1C20',
        'dc-ink':     '#ECECEE',
        'dc-ink2':    '#A1A1A8',
        'dc-ink3':    '#6B6B72',
        'dc-ink4':    '#44444B',
        'dc-cyan':    '#22D3EE',
        'dc-orange':  '#FF7A1A',
        'dc-red':     '#FF3B47',
        'dc-green':   '#22C98B',
        'dc-amber':   '#F5B33D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        '11': ['11px', { lineHeight: '1.5' }],
        '13': ['13px', { lineHeight: '1.5' }],
        '135': ['13.5px', { lineHeight: '1.5' }],
        '15': ['15px', { lineHeight: '1.5' }],
        '17': ['17px', { lineHeight: '1.5' }],
        '18': ['18px', { lineHeight: '1.55' }],
        '19': ['19px', { lineHeight: '1.5' }],
        '22': ['22px', { lineHeight: '1.5' }],
        '40': ['40px', { lineHeight: '1.08' }],
        '44': ['44px', { lineHeight: '1.08' }],
        '72': ['72px', { lineHeight: '1.02' }],
      },
    },
  },
  plugins: [],
}

export default config
