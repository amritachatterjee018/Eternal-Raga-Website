/** Shared theme colour map — import in both listing and detail pages */
export const THEME_COLORS: Record<string, { color: string; label_en: string; label_hi: string }> = {
  cosmic_order: { color: '#7B8EC2', label_en: 'Cosmic Order',  label_hi: 'ब्रह्माण्डीय व्यवस्था' },
  devotion:     { color: '#E8A317', label_en: 'Devotion',      label_hi: 'भक्ति' },
  liberation:   { color: '#AB47BC', label_en: 'Liberation',    label_hi: 'मोक्ष' },
  wisdom:       { color: '#42A5F5', label_en: 'Wisdom',        label_hi: 'ज्ञान' },
  creation:     { color: '#66BB6A', label_en: 'Creation',      label_hi: 'सृष्टि' },
  power:        { color: '#FF7043', label_en: 'Power',         label_hi: 'शक्ति' },
  compassion:   { color: '#F0A0C0', label_en: 'Compassion',    label_hi: 'करुणा' },
  protection:   { color: '#5BA3CF', label_en: 'Protection',    label_hi: 'रक्षा' },
  knowledge:    { color: '#B8A88A', label_en: 'Knowledge',     label_hi: 'विद्या' },
  courage:      { color: '#FF8A65', label_en: 'Courage',       label_hi: 'साहस' },
  love:         { color: '#E06060', label_en: 'Love',          label_hi: 'प्रेम' },
  purity:       { color: '#FFFFFF', label_en: 'Purity',        label_hi: 'पवित्रता' },
  prosperity:   { color: '#F5C518', label_en: 'Prosperity',    label_hi: 'समृद्धि' },
  destruction:  { color: '#E53935', label_en: 'Destruction',   label_hi: 'संहार' },
  healing:      { color: '#81C784', label_en: 'Healing',       label_hi: 'उपचार' },
};

/** Per-theme description for the Theme Explorer accordions */
export const THEME_DESCRIPTIONS: Record<string, string> = {
  cosmic_order: 'Names revealing Vishnu\'s role as the supreme architect and maintainer of universal law and order.',
  devotion:     'Names celebrating the intimate bond between the Lord and His devotees.',
  liberation:   'Names pointing toward moksha, the ultimate freedom from the cycle of birth and death.',
  wisdom:       'Names embodying divine knowledge, discernment, and philosophical truth.',
  creation:     'Names describing the Lord\'s power to generate, birth, and manifest all of existence.',
  power:        'Names declaring Vishnu\'s supreme authority, strength, and cosmic sovereignty.',
  compassion:   'Names expressing the Lord\'s unconditional mercy and tender care for all beings.',
  protection:   'Names invoking Vishnu as the divine guardian and shield against every danger.',
  knowledge:    'Names celebrating the Lord as the source and standard of all that can be known.',
  courage:      'Names honouring divine valour, invincibility, and fearless heroism.',
  love:         'Names revealing the Lord\'s beauty, tenderness, and all-attracting divine romance.',
  purity:       'Names describing the Lord as the supreme purifier who cleanses every impurity.',
  prosperity:   'Names invoking Vishnu\'s abundant wealth, generosity, and inexhaustible divine fortune.',
  destruction:  'Names declaring the Lord\'s power to dissolve evil, ignorance, and even death itself.',
  healing:      'Names celebrating the Lord as the divine healer, nourisher, and restorer of balance.',
};
