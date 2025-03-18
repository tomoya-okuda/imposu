import { createSystem, defaultConfig } from '@chakra-ui/react'
import { Zen_Kaku_Gothic_New } from 'next/font/google'

const zenkaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-zenkaku',
})

export const system = createSystem(defaultConfig, {
  globalCss: {
    'html, body': {
      bg: 'White.200',
      maxW: '100vw',
      overflowX: 'hidden',
      scrollbarWidth: 'none',
      scrollBehavior: 'smooth',
      letterSpacing: '0.1em',
    },
    '*': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    img: {
      display: 'block',
    },
    '.max6XL': {
      maxWidth: '6xl',
      margin: '0 auto',
    },
    '.px7': {
      px: '7',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: `${zenkaku.style.fontFamily}`,
        },
        body: { value: `${zenkaku.style.fontFamily}` },
      },
      fontSizes: {
        xs: { value: '12px' },
        sm: { value: '14px' },
        md: { value: '16px' },
        lg: { value: '18px' },
        xl: { value: '20px' },
        '2xl': { value: '24px' },
        '3xl': { value: '28px' },
        '4xl': { value: '32px' },
        '5xl': { value: '36px' },
        '6xl': { value: '40px' },
        '7xl': { value: '44px' },
        '8xl': { value: '48px' },
        '9xl': { value: '52px' },
        '10xl': { value: '56px' },
        '11xl': { value: '60px' },
        '12xl': { value: '64px' },
      },
      colors: {
        White: {
          100: { value: '#FFFFFF' },
          200: { value: '#F1F4FF' },
        },
        LightGray: {
          100: { value: '#E8E9ED' },
        },
        DarkGray: {
          100: { value: '#4A485F' },
        },
        Black: {
          100: { value: '#0F0D26' },
        },
        Primary: {
          100: { value: '#5B74FF' },
        },
        Secondary: {
          100: { value: '#09AF2D' },
        },
        Tertiary: {
          100: { value: '#FFD700' },
        },
      },
    },
  },
})
