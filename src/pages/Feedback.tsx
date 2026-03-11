import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const CATEGORIES = [
  'Mantra / Stotra Request',
  'Bhajan / Song Request',
  'Meditation Content Request',
  'Scripture Request',
  'Temple Information Request',
  'Yoga Content Request',
  'Bug Report',
  'General Feedback'
];

const DEITIES = [
  'Shiva', 'Krishna', 'Vishnu', 'Ganesh', 'Durga', 'Ram', 'Lakshmi', 'Hanuman', 'Saraswati', 'Kali', 'Kartikeya', 'Other', 'Not Applicable'
];

const MOST_REQUESTED = [
  { title: 'Kalabhairava Ashtakam', requests: 23 },
  { title: 'Vishnu Sahasranamam with word-by-word meaning', requests: 19 },
  { title: 'Guided Chakra Meditation Video', requests: 15 },
  { title: 'Surya Namaskar Step-by-Step Guide', requests: 12 },
  { title: 'Durga Saptashati Complete Text', requests: 11 },
];

export default function Feedback() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-[var(--color-brand-purple)] mb-4">
          Request Content & Feedback <span className="hindi-text ml-2">सामग्री अनुरोध और सुझाव</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help us build the content you want. Every request shapes what we create next.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={64} className="text-green-500 mb-6" />
                <h3 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-2">Thank you!</h3>
                <p className="text-gray-600 mb-4">Your request has been received. We review all requests and prioritize based on community demand.</p>
                <p className="text-[var(--color-brand-gold-dark)] font-serif">धन्यवाद! आपका अनुरोध प्राप्त हो गया है।</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Category <span className="text-red-500">*</span></label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent bg-white">
                    <option value="">Select Category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Related Deity (optional)</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent bg-white">
                    <option value="">Select Deity</option>
                    {DEITIES.map(deity => (
                      <option key={deity} value={deity}>{deity}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe your request or feedback <span className="text-red-500">*</span></label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="e.g., Please add Kalabhairava Ashtakam with meaning in English and Hindi..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your email (optional — if you'd like us to notify you when this content is added)</label>
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent"
                  />
                </div>

                <button 
                  type="submit"
                  className="cta-button w-full rounded-xl px-6 py-4 font-bold flex items-center justify-center gap-2"
                >
                  Submit Request <span className="font-serif font-normal">· अनुरोध भेजें</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#FFFDF0] rounded-2xl p-6 border border-[var(--color-brand-gold)]/30 shadow-sm sticky top-24">
            <h3 className="text-xl font-serif text-[var(--color-brand-purple)] mb-2">Most Requested</h3>
            <p className="text-[var(--color-brand-gold-dark)] font-serif mb-6">सबसे अधिक अनुरोधित</p>
            
            <div className="space-y-4">
              {MOST_REQUESTED.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1">
                  <h4 className="font-medium text-[var(--color-brand-purple)] text-sm">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)]"></span>
                    {item.requests} requests
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
