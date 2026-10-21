# Verification

## Automated

Run `node scripts/validate.cjs` from the repository root. Checks cover 64 sequential lesson IDs, source fields and page range, mapped grammar rules, 446 annotated vocalized word entries, 512 short Q&A, 384 four-option MCQs, valid answers, unique options, lesson phrases, goals, 64 distinct accent colors and required local assets.

JavaScript files were also checked with `node --check`.

## Browser verification

The site was served locally and inspected in Chromium. Desktop home, selected lesson navigation, all nine lesson tabs, word cards and a narrow mobile iframe were inspected. Exercises were checked with an unvocalized correct blank answer, vocabulary matching and Arabic word ordering. Quiz feedback and next-question navigation were exercised. Arabic and Urdu fonts are bundled locally.

## Limits

Automated validation verifies data consistency, not theological or linguistic authority. The selection is not exhaustive coverage of the book. Progress and bookmarks are browser-local; clearing site data removes them unless exported. No remote accounts or backend are included.

## Editorial revision

The validation additionally checks 256 distinct thematic short-question stems, alignment of each practical MCQ with its lesson scenario, synchronization of the syntax summary with every annotated word, and absence of the removed boilerplate. All 64 explanations and the thematic question sets were editorially rewritten. Source Arabic and lesson selection were retained.
