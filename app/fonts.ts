import localFont from 'next/font/local'

export const HK_Grotesk = localFont({
  src: [
    {
      path: '/fonts/hk-grotesk/hkgrotesk-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/hk-grotesk/hkgrotesk-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hk-grotesk',
})
