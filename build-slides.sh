#!/bin/bash

set -e

for file in slides/**/*.md; do
    # Supprime 'slides/' du chemin et remplace .md par .pdf/.html
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
