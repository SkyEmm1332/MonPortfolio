# -*- coding: utf-8 -*-
"""Remplace les 8 cartes de competences par les 9 competences du CV,
en conservant le CSS sticky (animation) et les couleurs is--N."""

path = 'index.html'
html = open(path, encoding='utf-8').read()
orig = html

# --- Nouveaux titres (ordre du CV : principales puis autres) ---
# (texte avant le span, texte du span, numero)
specs = [
    ("Gestion de projets", "et coordination multi-équipes", "(1)"),
    ("Formation & développement", "des compétences", "(2)"),
    ("Leadership", "& supervision d'équipes", "(3)"),
    ("Analyse, reporting", "& pilotage opérationnel", "(4)"),
    ("Analyse &", "visualisation de données", "(5)"),
    ("Automatisation", "& amélioration continue", "(6)"),
    ("Développement", "d'applications web", "(7)"),
    ("Design", "& montage", "(8)"),
]

old_headers = [
    'Développement <span class="font-ivyoradisplay">d\'applications web</span>',
    'Support technique <span class="font-ivyoradisplay">& maintenance</span>',
    'Gestion de <span class="font-ivyoradisplay">projets</span>',
    'Automatisation <span class="font-ivyoradisplay">des tâches</span>',
    'Analyse & <span class="font-ivyoradisplay">visualisation de données</span>',
    'Formation <span class="font-ivyoradisplay">utilisateurs</span>',
    'Design & <span class="font-ivyoradisplay">montage vidéo</span>',
    'Pilotage <span class="font-ivyoradisplay">opérationnel</span>',
]
old_nums = ['(01)', '(02)', '(3)', '(4)', '(5)', '(6)', '(7)', '(8)']

def count(s, text):
    return text.count(s)

for i in range(8):
    h, n = old_headers[i], f'<span class="card-top-text">{old_nums[i]}</span>'
    print(f'card{i}: header x{count(h, html)}  num x{count(n, html)}')
    assert count(h, html) == 1, f'header {i} non unique'
    assert count(n, html) == 1, f'numero {i} non unique'

for i in range(8):
    new_header = f'{specs[i][0]} <span class="font-ivyoradisplay">{specs[i][1]}</span>'
    html = html.replace(old_headers[i], new_header)
    html = html.replace(f'<span class="card-top-text">{old_nums[i]}</span>',
                        f'<span class="card-top-text">{specs[i][2]}</span>')

# La 8eme carte devient une carte standard (avec couleur inline)
old_open_last = '<div data-work-item="" class="stacking-card-last is--8">'
new_open_last = '<div data-work-item="" class="stacking-card is--8" style="background-color:#0f4a52">'
assert count(old_open_last, html) == 1
html = html.replace(old_open_last, new_open_last)

# Nouvelle 9eme carte = clone de la 8eme, devenue "Base de données"
start = html.find('<div data-work-item="" class="stacking-card is--8"')
assert start != -1, 'carte 8 introuvable'
end_marker = '</div><div class="container">'
end = html.find(end_marker, start)
assert end != -1, 'fin de section introuvable'
card8 = html[start:end]
card9 = card8
card9 = card9.replace('class="stacking-card is--8" style="background-color:#0f4a52"',
                      'class="stacking-card-last is--8"')
card9 = card9.replace('Design <span class="font-ivyoradisplay">& montage</span>',
                      'Base de <span class="font-ivyoradisplay">données</span>')
card9 = card9.replace('<span class="card-top-text">(8)</span>',
                      '<span class="card-top-text">(9)</span>')
card9 = card9.replace('aria-label="ai-power"', 'aria-label="base-de-donnees"')

html = html[:end] + card9 + html[end:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)

print('OK - fichier mis a jour. taille avant/apres:', len(orig), len(html))
