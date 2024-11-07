import { Metadata } from 'next'
import localFont from 'next/font/local'

export const HK_Grotesk = localFont({
  src: [
    {
      path: '../css/fonts/hk-grotesk/HKGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../css/fonts/hk-grotesk/HKGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-hk-grotesk'
})
import { Metadata } from 'next/font/google'
import localFont from 'next/font/local'

export const HK_Grotesk = localFont({
  src: [
    {
      path: '../css/fonts/hk-grotesk/HKGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../css/fonts/hk-grotesk/HKGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hk-grotesk',
})
