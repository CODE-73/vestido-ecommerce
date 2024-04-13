import './global.css';

export const metadata = {
  title: 'Vestido Nation',
  description:
    'Coming soon: Discover your style sanctuary! Stay tuned for our upcoming fashion destination, curated just for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
