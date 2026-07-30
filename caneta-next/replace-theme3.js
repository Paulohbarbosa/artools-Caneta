const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// The dark buttons that are "bg-stone-900 border border-stone-200"
content = content.replace(/bg-stone-900 border border-stone-200/g, 'bg-white border border-stone-300 shadow-sm');
content = content.replace(/hover:bg-stone-800/g, 'hover:bg-stone-100');
content = content.replace(/hover:text-white/g, 'hover:text-stone-900');

// "Inativo" badge which was "bg-stone-800 text-stone-500"
content = content.replace(/bg-stone-800 text-stone-500/g, 'bg-stone-200 text-stone-600');

// "Pendente" badge etc? No, those were bg-amber-950/40 text-amber-600 etc. which were also fixed.
content = content.replace(/bg-stone-900\/60/g, 'bg-stone-50');

// Other random bg-stone-900 that might be left (excluding selection:bg-stone-900 and overlays bg-stone-900/40)
// The payment method pills (PIX, Cartão): they were 'bg-stone-900 border border-stone-200' 
// Actually they already got matched by the first replace if they had borders. Let's double check.

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Replacements done');
