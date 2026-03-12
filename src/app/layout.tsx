import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eternal Raga — शाश्वत राग',
  description: 'Sacred Hindu devotional content — Mantras, Stotrams, Scriptures, Temples, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  );
}
