import { Lato, Lexend } from 'next/font/google';

/*
  Fonts
  - Lexend Semi Bold for Headlines (https://fonts.google.com/specimen/Lexend)
  - Lato Regular for Body Text (https://fonts.google.com/specimen/Lato)
}
*/

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-lato',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['600', '400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-lexend',
});

const StorefrontFonts = () => (
  <>
    <style global jsx>{`
      html,
      body {
        font-family: ${lato.style.fontFamily};
        font-weight: 400;
        font-style: normal;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: ${lexend.style.fontFamily};
        font-weight: 600;
        font-style: normal;
      }
    `}</style>
  </>
);

export default StorefrontFonts;
