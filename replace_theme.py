import re

with open('user.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS Variables
content = content.replace('--bg-color: #111111;', '--bg-color: #EAEAE5;')
content = content.replace('--text-main: #FFFFFF;', '--text-main: #1c1917;')
content = content.replace('--text-secondary: #9CA3AF;', '--text-secondary: #78716c;')
content = content.replace('--border-color: rgba(255, 255, 255, 0.08);', '--border-color: rgba(0, 0, 0, 0.1);')

# Scrollbar
content = content.replace('background: #111111;', 'background: #EAEAE5;')
content = content.replace('background: #252525;', 'background: #d6d3d1;')
content = content.replace('background: #333333;', 'background: #a8a29e;')

# Floating inputs
content = content.replace('background: rgba(255, 255, 255, 0.03);', 'background: rgba(0, 0, 0, 0.03);')
content = content.replace('color: #FFFFFF;', 'color: #1c1917;')
content = content.replace('border-color: rgba(255, 255, 255, 0.3);', 'border-color: rgba(0, 0, 0, 0.3);')
content = content.replace('background: rgba(255, 255, 255, 0.05);', 'background: rgba(0, 0, 0, 0.05);')
content = content.replace('color: #9CA3AF;', 'color: #78716c;')

# Glass panel
content = content.replace('glass-panel-dark', 'glass-panel')
content = content.replace('background: rgba(27, 27, 27, 0.6);', 'background: rgba(255, 255, 255, 0.4);')

# Tailind class replacements (ordered by length to prevent partial matches usually, but let's use word boundaries where possible or regex)
replacements = {
    r'\btext-white\b': 'text-stone-900',
    r'\bbg-white/10\b': 'bg-black/5',
    r'\bbg-white/5\b': 'bg-black/5',
    r'\bbg-white/20\b': 'bg-black/10',
    r'\bborder-white/10\b': 'border-black/10',
    r'\bborder-white/5\b': 'border-black/5',
    r'\bborder-white/20\b': 'border-black/20',
    r'\bhover:bg-white/5\b': 'hover:bg-black/5',
    r'\bhover:bg-white/10\b': 'hover:bg-black/10',
    r'\bhover:bg-white/20\b': 'hover:bg-black/20',
    r'\btext-stone-400\b': 'text-stone-500',
    r'\btext-stone-300\b': 'text-stone-600',
    r'\bhover:text-white\b': 'hover:text-stone-900',
    r'\bbg-[#111111]/80\b': 'bg-white/80',
    r'\bbg-[#111111]\b': 'bg-[#EAEAE5]',
    r'\btext-\[\#111\]\b': 'text-white',
    r'\bg-dark-card/50\b': 'bg-stone-200/50',
    r'\bdecoration-white/30\b': 'decoration-black/30'
}

for k, v in replacements.items():
    content = re.sub(k, v, content)

# Buttons fix (bg-white text-black -> bg-stone-900 text-white)
content = content.replace('bg-white text-black', 'bg-stone-900 text-white')
content = content.replace('hover:bg-stone-200', 'hover:bg-stone-800')
# Body bg and text (it was text-white, now text-stone-900)
# But we already did text-white to text-stone-900
# So 'text-white' inside body class is 'text-stone-900'. Let's check body class.
# The body class was 'text-white'. It is now 'text-stone-900'

# bg-stone-900 text-stone-900 is wrong for the PB avatar.
# In original: bg-white text-black. Now bg-stone-900 text-white. That's correct.

# bg-white/5 text-white -> bg-black/5 text-stone-900 (done by regex above)

# Overlay Background fixing:
# <div class="fixed inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
content = content.replace('rgba(255,255,255,0.05)', 'rgba(0,0,0,0.03)')

with open('user.html', 'w', encoding='utf-8') as f:
    f.write(content)
