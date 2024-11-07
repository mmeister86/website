import localFont from 'next/font/local'

export const HK_Grotesk = localFont({
  src: [
    {
      path: '../public/fonts/hk-grotesk/HKGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/hk-grotesk/HKGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hk-grotesk',
})
