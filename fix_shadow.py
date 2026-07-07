import re

with open('user.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('rgba(255,255,255,0.2)', 'rgba(0,0,0,0.1)')
content = content.replace('rgba(255,255,255,0.1)', 'rgba(0,0,0,0.05)')
content = content.replace('shadow-[0_0_20px_rgba(0,0,0,0.05)]', 'shadow-xl')
content = content.replace('text-emerald-400', 'text-emerald-700')
content = content.replace('bg-emerald-500/10', 'bg-emerald-500/20')

with open('user.html', 'w', encoding='utf-8') as f:
    f.write(content)
