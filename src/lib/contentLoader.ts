/**
 * contentLoader.ts  —  SERVER ONLY (uses Node.js `fs`)
 * Also loads Sahasranama data from data/sahasranamas/vishnu_sahasranama_master.json
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

/* ═══════════════════════════════════════════════════════════════
   VISHNU SAHASRANAMA
   Reads data/sahasranamas/vishnu_sahasranama_master.json
   SERVER ONLY — never imported in client components
   ═══════════════════════════════════════════════════════════════ */

const VISHNU_JSON_PATH = path.join(DATA_DIR, 'sahasranamas', 'vishnu_sahasranama_master.json');

export interface WordEntry {
  sanskrit: string;
  en: string;
  hi: string;
}

export interface VishnuName {
  number: number;
  name_sanskrit: string;       // ॐ विश्वाय नमः
  name_devanagari: string;     // विश्वम्
  name_iast: string;           // Viśvam
  root_word: string;           // viś
  meaning_en: string;
  meaning_hi: string;
  word_by_word: Record<string, WordEntry>;
  theme: string;               // cosmic_order | protection | etc.
  modern_context: string;      // Hindi paragraph
  modern_context_en: string;   // English paragraph
  nri_context: string;
  usage_context: string;
}

// Lazy-loaded cache — JSON is only read once per server process
let _vishnuCache: VishnuName[] | null = null;

function loadVishnuNames(): VishnuName[] {
  if (_vishnuCache) return _vishnuCache;
  const raw = fs.readFileSync(VISHNU_JSON_PATH, 'utf-8');
  _vishnuCache = JSON.parse(raw) as VishnuName[];
  return _vishnuCache;
}

/** Returns all 1000 Vishnu Sahasranama entries */
export function getAllVishnuNames(): VishnuName[] {
  return loadVishnuNames();
}

/** Returns a single entry by 1-based number (1–1000) */
export function getVishnuNameByNumber(n: number): VishnuName | null {
  const all = loadVishnuNames();
  return all.find(v => v.number === n) ?? null;
}

/** Returns all entries matching the given theme */
export function getVishnuNamesByTheme(theme: string): VishnuName[] {
  return loadVishnuNames().filter(v => v.theme === theme);
}

/** Returns `{ number: '1' }` … `{ number: '1000' }` for generateStaticParams */
export function getVishnuNameStaticParams(): { number: string }[] {
  return loadVishnuNames().map(v => ({ number: String(v.number) }));
}

/** Returns count of names per theme */
export function getThemeCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const v of loadVishnuNames()) {
    counts[v.theme] = (counts[v.theme] ?? 0) + 1;
  }
  return counts;
}

/** Returns up to `limit` names from the same theme, excluding the given number, sorted by canonical order */
export function getRelatedNamesByTheme(
  theme: string,
  excludeNumber: number,
  limit: number
): VishnuName[] {
  return loadVishnuNames()
    .filter(v => v.theme === theme && v.number !== excludeNumber)
    .slice(0, limit);
}

