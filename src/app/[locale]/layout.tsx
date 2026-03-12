// Server Component — Navbar and Footer handle their own 'use client' boundaries
// force-dynamic: pages use localStorage/window and cannot be statically prerendered
export const dynamic = 'force-dynamic';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
