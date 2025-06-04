#!/bin/bash

# Crée le dossier cible
mkdir -p static/slides

# Trouve tous les fichiers .md dans slides/ récursivement
find slides -type f -name "*.md" | while read file; do
    # Supprime 'slides/' du chemin
    relative_path="${file#slides/}"
    output_path_pdf="static/slides/${relative_path%.md}.pdf"
    output_path_html="static/slides/${relative_path%.md}.html"

    # Crée le dossier cible si nécessaire
    mkdir -p "$(dirname "$output_path_pdf")"

    echo "🛠️ Génération PDF : $file -> $output_path_pdf"
    npx @marp-team/marp-cli "$file" --pdf -o "$output_path_pdf"

    echo "🛠️ Génération HTML : $file -> $output_path_html"
    npx @marp-team/marp-cli "$file" --html -o "$output_path_html"
done

echo "✅ Tous les slides ont été convertis."

