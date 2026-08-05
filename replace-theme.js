const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Colors replacement mapping
const replacements = [
  // Backgrounds
  { from: /bg-\\[#111111\\]/g, to: 'bg-[#EAEAE5]' },
  { from: /bg-\\[#171717\\]/g, to: 'bg-stone-50' },
  { from: /bg-\\[#1F1F1F\\]/g, to: 'bg-white' },
  { from: /bg-\\[#292929\\]/g, to: 'bg-stone-100' },
  
  // Borders
  { from: /border-white\/5/g, to: 'border-stone-200' },
  { from: /border-white\/10/g, to: 'border-stone-300' },
  { from: /border-white\/20/g, to: 'border-stone-400' },
  
  // Text
  { from: /text-white/g, to: 'text-stone-900' }
];

for (const {from, to} of replacements) {
  content = content.replace(from, to);
}

// Fix buttons that became 'bg-stone-900 text-stone-900'
content = content.replace(/bg-stone-900([^"']*?)text-stone-900/g, 'bg-stone-900$1text-white');
content = content.replace(/text-stone-900([^"']*?)bg-stone-900/g, 'text-white$1bg-stone-900');

// Fix 'text-stone-400' to 'text-stone-500' for better contrast in light mode
content = content.replace(/text-stone-400/g, 'text-stone-500');

// hover states
content = content.replace(/hover:bg-white\/5/g, 'hover:bg-stone-100');
content = content.replace(/hover:bg-white\/10/g, 'hover:bg-stone-200');
content = content.replace(/hover:bg-white\/\[0\.01\]/g, 'hover:bg-stone-50');
content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-stone-50');

// text-stone-300 -> text-stone-600
content = content.replace(/text-stone-300/g, 'text-stone-600');

// modal overlays
content = content.replace(/bg-black\/60/g, 'bg-stone-900/40');
content = content.replace(/bg-black\/70/g, 'bg-stone-900/40');

// Selection
content = content.replace(/selection:bg-white selection:text-\[#111111\]/g, 'selection:bg-stone-900 selection:text-white');

// Additional dark mode strings
content = content.replace(/text-emerald-300/g, 'text-emerald-700');
content = content.replace(/text-rose-300/g, 'text-rose-700');
content = content.replace(/text-amber-300/g, 'text-amber-700');
content = content.replace(/text-emerald-400/g, 'text-emerald-600');
content = content.replace(/text-rose-400/g, 'text-rose-600');
content = content.replace(/text-amber-400/g, 'text-amber-600');
content = content.replace(/bg-emerald-950\/80/g, 'bg-emerald-50');
content = content.replace(/bg-rose-950\/80/g, 'bg-rose-50');
content = content.replace(/bg-amber-950\/80/g, 'bg-amber-50');
content = content.replace(/border-emerald-500\/30/g, 'border-emerald-200');
content = content.replace(/border-rose-500\/30/g, 'border-rose-200');
content = content.replace(/border-amber-500\/30/g, 'border-amber-200');

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Replacements done');
