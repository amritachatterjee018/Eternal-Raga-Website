import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const config: NextConfig = {
  images: {
    // Allow all external domains during development (picsum, etc.)
    unoptimized: true,
  },
};

export default withNextIntl(config);
