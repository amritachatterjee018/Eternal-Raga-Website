/**
 * contentLoader.ts  —  SERVER ONLY (uses Node.js `fs`)
 * Scans /data/ subfolders and returns typed mantra objects.
 *
 * NOTE: Actual folder names on disk (confirmed):
 *   astakam/   aartis/   chalisas/   stotrams/
 *   suktams/   kavachs/  sahasranamas/  108_names/
 * (No jap-mantras folder exists yet.)
 */
import fs   from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/** Folders to scan, in the order they appear on disk */
const CONTENT_FOLDERS = [
  { folder: 'astakam',      type: 'ashtakam'    },
  { folder: 'aartis',       type: 'aarti'        },
  { folder: 'chalisas',     type: 'chalisa'      },
  { folder: 'stotrams',     type: 'stotram'      },
  { folder: 'suktams',      type: 'suktam'       },
  { folder: 'kavachs',      type: 'kavach'       },
  { folder: 'sahasranamas', type: 'sahasranama'  },
  { folder: '108_names',    type: '108-names'    },
] as const;

/* ─── Types ─────────────────────────────────────────────────────── */
export interface MantraItem {
  id: string;
  title_en: string;
  title_hi: string;
  deity: string;
  type: string;
  author?: string;
  author_hi?: string;
  total_verses?: number;
  description_en?: string;
  description_hi?: string;
  recitation_benefits?: string[];
  best_time_to_recite?: string[];
  youtube_url?: string;   // e.g. "https://www.youtube.com/watch?v=XXX"
  audio_url?: string;     // direct mp3/ogg URL
  verses?: MantraVerse[];
  /** injected by loader */
  _folder: string;
  _filename: string;
}

export interface MantraVerse {
  verse_number: number;
  section?: string;
  hindi_text: string;         // Devanagari Sanskrit text
  transliteration: string;
  meaning_en: string;
  meaning_hi: string;
  modern_context_en?: string;
  modern_context_hi?: string;
  word_by_word?: Record<string, string>;
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function readFolder(folder: string): MantraItem[] {
  const folderPath = path.join(DATA_DIR, folder);
  if (!fs.existsSync(folderPath)) return [];

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(folderPath, file), 'utf-8');
    const content = JSON.parse(raw) as MantraItem;
    return { ...content, _folder: folder, _filename: file };
  });
}

/* ─── Public API ─────────────────────────────────────────────────── */

/** Returns ALL mantras from every content folder. */
export function getAllMantras(): MantraItem[] {
  return CONTENT_FOLDERS.flatMap(({ folder }) => readFolder(folder));
}

/**
 * Finds a single mantra by its `id` field.
 * Skips the 108-names folder (those have their own hand-crafted routes).
 */
export function getMantraBySlug(slug: string): MantraItem | null {
  for (const { folder } of CONTENT_FOLDERS) {
    const items = readFolder(folder);
    const found = items.find(m => m.id === slug);
    if (found) return found;
  }
  return null;
}

/** Filter by `type` field. */
export function getMantrasByType(type: string): MantraItem[] {
  return getAllMantras().filter(m => m.type === type);
}

/** Filter by `deity` field (case-insensitive). */
export function getMantrasByDeity(deity: string): MantraItem[] {
  return getAllMantras().filter(
    m => m.deity?.toLowerCase() === deity.toLowerCase()
  );
}

/**
 * Returns slugs for generateStaticParams.
 * Excludes `108-names` type (those pages are hand-crafted).
 */
export function getMantraStaticParams(): { slug: string }[] {
  return getAllMantras()
    .filter(m => m.type !== '108-names')
    .map(m => ({ slug: m.id }));
}
