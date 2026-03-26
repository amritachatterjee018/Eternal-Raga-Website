/**
 * sahasranamaImageMeta.ts
 * Static image metadata for all 26 Sahasranamas.
 * `src` points to /public/images/sahasranama/ — files will be added later.
 * When a real image is dropped in, it auto-replaces the gradient placeholder.
 */

export interface SahasranamaImageMeta {
  src: string;              // e.g. /images/sahasranama/vishnu_sahasranama.jpg
  altEn: string;
  altHi: string;
  placeholderColor: string; // accent color for the radial gradient
  devanagariName: string;   // large text shown in placeholder
}

export const SAHASRANAMA_IMAGE_META: Record<string, SahasranamaImageMeta> = {
  sahasranama_vishnu: {
    src: '/images/sahasranama/vishnu_sahasranama.jpg',
    altEn: 'Lord Vishnu in divine four-armed form',
    altHi: 'चतुर्भुज दिव्य रूप में भगवान विष्णु',
    placeholderColor: '#5BA3CF',
    devanagariName: 'विष्णु',
  },
  sahasranama_lalita: {
    src: '/images/sahasranama/lalita_sahasranama.jpg',
    altEn: 'Goddess Lalita Tripura Sundari in radiant form',
    altHi: 'तेजस्वी रूप में देवी ललिता त्रिपुर सुंदरी',
    placeholderColor: '#E06060',
    devanagariName: 'ललिता',
  },
  sahasranama_venkateswara: {
    src: '/images/sahasranama/venkateswara_sahasranama.jpg',
    altEn: 'Lord Venkateswara (Balaji) of Tirupati',
    altHi: 'तिरुपति के भगवान वेंकटेश्वर (बालाजी)',
    placeholderColor: '#5BA3CF',
    devanagariName: 'वेंकटेश्वर',
  },
  sahasranama_hanuman: {
    src: '/images/sahasranama/hanuman_sahasranama.jpg',
    altEn: 'Lord Hanuman in devotional pose',
    altHi: 'भक्ति मुद्रा में भगवान हनुमान',
    placeholderColor: '#FF8A65',
    devanagariName: 'हनुमान',
  },
  sahasranama_shiva: {
    src: '/images/sahasranama/shiva_sahasranama.jpg',
    altEn: 'Lord Shiva in meditative form, Kailash',
    altHi: 'ध्यान मुद्रा में भगवान शिव, कैलाश',
    placeholderColor: '#7B8EC2',
    devanagariName: 'शिव',
  },
  sahasranama_krishna: {
    src: '/images/sahasranama/krishna_sahasranama.jpg',
    altEn: 'Lord Krishna with flute in Vrindavan',
    altHi: 'वृंदावन में भगवान कृष्ण बाँसुरी के साथ',
    placeholderColor: '#5BA3CF',
    devanagariName: 'कृष्ण',
  },
  sahasranama_lakshmi: {
    src: '/images/sahasranama/lakshmi_sahasranama.jpg',
    altEn: 'Goddess Lakshmi bestowing blessings',
    altHi: 'आशीर्वाद देती देवी लक्ष्मी',
    placeholderColor: '#F0A0C0',
    devanagariName: 'लक्ष्मी',
  },
  sahasranama_ganesha: {
    src: '/images/sahasranama/ganesha_sahasranama.jpg',
    altEn: 'Lord Ganesha, remover of obstacles',
    altHi: 'विघ्नहर्ता भगवान गणेश',
    placeholderColor: '#E8A317',
    devanagariName: 'गणेश',
  },
  sahasranama_durga: {
    src: '/images/sahasranama/durga_sahasranama.jpg',
    altEn: 'Goddess Durga in fierce divine form',
    altHi: 'उग्र दिव्य रूप में देवी दुर्गा',
    placeholderColor: '#E06060',
    devanagariName: 'दुर्गा',
  },
  sahasranama_kali: {
    src: '/images/sahasranama/kali_sahasranama.jpg',
    altEn: 'Goddess Kali, destroyer of evil',
    altHi: 'असुरों की संहारक देवी काली',
    placeholderColor: '#8E24AA',
    devanagariName: 'काली',
  },
  sahasranama_rama: {
    src: '/images/sahasranama/rama_sahasranama.jpg',
    altEn: 'Lord Rama with bow in divine pose',
    altHi: 'धनुष के साथ दिव्य मुद्रा में भगवान राम',
    placeholderColor: '#81C784',
    devanagariName: 'राम',
  },
  sahasranama_subramanya: {
    src: '/images/sahasranama/subramanya_sahasranama.jpg',
    altEn: 'Lord Subramanya (Murugan) with Vel',
    altHi: 'वेल के साथ भगवान सुब्रमण्य (मुरुगन)',
    placeholderColor: '#7B8EC2',
    devanagariName: 'सुब्रमण्य',
  },
  sahasranama_surya: {
    src: '/images/sahasranama/surya_sahasranama.jpg',
    altEn: 'Lord Surya, the Sun God, in golden radiance',
    altHi: 'स्वर्णिम प्रकाश में सूर्य देव',
    placeholderColor: '#E8A317',
    devanagariName: 'सूर्य',
  },
  sahasranama_narasimha: {
    src: '/images/sahasranama/narasimha_sahasranama.jpg',
    altEn: 'Lord Narasimha, the man-lion avatar of Vishnu',
    altHi: 'भगवान विष्णु के नरसिंह अवतार',
    placeholderColor: '#5BA3CF',
    devanagariName: 'नरसिंह',
  },
  sahasranama_gayatri: {
    src: '/images/sahasranama/gayatri_sahasranama.jpg',
    altEn: 'Goddess Gayatri, the divine mother of the Vedas',
    altHi: 'वेदों की दिव्य माता देवी गायत्री',
    placeholderColor: '#E8D5A0',
    devanagariName: 'गायत्री',
  },
  sahasranama_rudra: {
    src: '/images/sahasranama/rudra_sahasranama.jpg',
    altEn: 'Lord Rudra in fierce cosmic form',
    altHi: 'उग्र ब्रह्मांडीय रूप में भगवान रुद्र',
    placeholderColor: '#7B8EC2',
    devanagariName: 'रुद्र',
  },
  sahasranama_dakshinamurthy: {
    src: '/images/sahasranama/dakshinamurthy_sahasranama.jpg',
    altEn: 'Lord Dakshinamurthy, Shiva as the supreme teacher',
    altHi: 'परम गुरु शिव, भगवान दक्षिणामूर्ति',
    placeholderColor: '#7B8EC2',
    devanagariName: 'दक्षिणामूर्ति',
  },
  sahasranama_annapurna: {
    src: '/images/sahasranama/annapurna_sahasranama.jpg',
    altEn: 'Goddess Annapurna, provider of food and nourishment',
    altHi: 'अन्न और पोषण की दाता देवी अन्नपूर्णा',
    placeholderColor: '#E06060',
    devanagariName: 'अन्नपूर्णा',
  },
  sahasranama_bhuvaneshwari: {
    src: '/images/sahasranama/bhuvaneshwari_sahasranama.jpg',
    altEn: 'Goddess Bhuvaneshwari, queen of the cosmos',
    altHi: 'ब्रह्मांड की रानी देवी भुवनेश्वरी',
    placeholderColor: '#E06060',
    devanagariName: 'भुवनेश्वरी',
  },
  sahasranama_tripura_sundari: {
    src: '/images/sahasranama/tripura_sundari_sahasranama.jpg',
    altEn: 'Goddess Tripura Sundari, the beauty of the three worlds',
    altHi: 'तीन लोकों की सुंदरी देवी त्रिपुर सुंदरी',
    placeholderColor: '#E06060',
    devanagariName: 'त्रिपुर सुंदरी',
  },
  sahasranama_rajarajeshwari: {
    src: '/images/sahasranama/rajarajeshwari_sahasranama.jpg',
    altEn: 'Goddess Rajarajeshwari, queen of kings',
    altHi: 'राजाओं की रानी देवी राजराजेश्वरी',
    placeholderColor: '#E06060',
    devanagariName: 'राजराजेश्वरी',
  },
  sahasranama_heramba_ganesha: {
    src: '/images/sahasranama/heramba_ganesha_sahasranama.jpg',
    altEn: 'Lord Heramba Ganesha with five heads',
    altHi: 'पंचमुखी भगवान हेरम्ब गणेश',
    placeholderColor: '#E8A317',
    devanagariName: 'हेरम्ब गणेश',
  },
  sahasranama_dattatreya: {
    src: '/images/sahasranama/dattatreya_sahasranama.jpg',
    altEn: 'Lord Dattatreya, the divine trinity incarnate',
    altHi: 'दिव्य त्रिमूर्ति स्वरूप भगवान दत्तात्रेय',
    placeholderColor: '#5BA3CF',
    devanagariName: 'दत्तात्रेय',
  },
  sahasranama_ayyappa: {
    src: '/images/sahasranama/ayyappa_sahasranama.jpg',
    altEn: 'Lord Ayyappa of Sabarimala',
    altHi: 'शबरीमाला के भगवान अय्यप्पा',
    placeholderColor: '#7B8EC2',
    devanagariName: 'अय्यप्पा',
  },
  sahasranama_varaha: {
    src: '/images/sahasranama/varaha_sahasranama.jpg',
    altEn: 'Lord Varaha, the boar avatar of Vishnu',
    altHi: 'विष्णु के वराह अवतार',
    placeholderColor: '#5BA3CF',
    devanagariName: 'वराह',
  },
  sahasranama_hayagriva: {
    src: '/images/sahasranama/hayagriva_sahasranama.jpg',
    altEn: 'Lord Hayagriva, the horse-headed deity of knowledge',
    altHi: 'ज्ञान के अश्वमुख देव भगवान हयग्रीव',
    placeholderColor: '#5BA3CF',
    devanagariName: 'हयग्रीव',
  },
};
