const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Use string replaceAll to avoid regex escape issues
content = content.replaceAll('bg-[#111111]', 'bg-[#EAEAE5]');
content = content.replaceAll('bg-[#171717]', 'bg-stone-50');
content = content.replaceAll('bg-[#1F1F1F]', 'bg-white');
content = content.replaceAll('bg-[#292929]', 'bg-stone-100');
content = content.replaceAll('bg-[#111111]/85', 'bg-[#EAEAE5]/85');

// Additional dark background remnants
content = content.replaceAll('bg-stone-900 border border-white/5', 'bg-white border border-stone-200');

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Replacements done');
