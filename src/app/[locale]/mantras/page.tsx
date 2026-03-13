import MantrasPage from '../../../_pages/Mantras';
import { getAllMantras } from '../../../lib/contentLoader';

/** Server component — fetches all mantras at build time and passes to client */
export default async function MantrasListingPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const allMantras = getAllMantras();

  // Shape the data to match the existing MANTRAS_DATA format used in Mantras.tsx
  const serverMantras = allMantras.map((m, idx) => ({
    id: idx + 100, // unique numeric id (avoids clash with existing 1–15 hardcoded entries)
    name: m.title_en,
    hindi: m.title_hi,
    type: mapTypeToLabel(m.type, m._folder),
    deity: capitalise(m.deity),
    duration: m.total_verses ? `~${Math.ceil(m.total_verses * 0.6)} min` : '~5 min',
    desc: m.description_en ?? '',
    // 108-names always links to the dedicated handcrafted page
    link: m.type === '108-names' || m._folder === '108_names'
      ? `/${locale}/mantras/108-names-of-shiva`
      : `/${locale}/mantras/${m.id}`,
    deityIcon: `https://picsum.photos/seed/${m.deity || 'deity'}-icon/100/100`,
  }));

  return <MantrasPage serverMantras={serverMantras} />;
}


function capitalise(s?: string) {
  if (!s) return 'Universal';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function mapTypeToLabel(type: string | undefined, folder?: string): string {
  // Use folder as a fallback when type is empty/missing
  const effectiveType = type || folderToType(folder || '');
  const map: Record<string, string> = {
    ashtakam:    'Ashtakams',
    aarti:       'Aartis',
    chalisa:     'Chalisas',
    stotram:     'Stotrams',
    suktam:      'Suktams',
    kavach:      'Kavachs',
    'jap-mantra':'Jap Mantras',
    sahasranama: 'Sahasranama',
    '108-names': '108 Names',
  };
  return map[effectiveType] || 'Stotrams';
}

function folderToType(folder: string): string {
  const map: Record<string, string> = {
    astakam:      'ashtakam',
    aartis:       'aarti',
    chalisas:     'chalisa',
    stotrams:     'stotram',
    suktams:      'suktam',
    kavachs:      'kavach',
    sahasranamas: 'sahasranama',
    '108_names':  '108-names',
  };
  return map[folder] || 'stotram';
}