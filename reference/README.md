# Reference Files

This folder is **gitignored** — nothing here is committed to the repository.

Use it to store local reference material for the KTMG redesign:

## Suggested structure

```
reference/
├── designs/          original design mockups, wireframes
├── brand/            brand guidelines, color swatches, font files
├── photos/           raw clinic photos, team headshots (before cropping)
├── logos/            original logo files in all formats
├── old-site/         screenshots of the existing ktdoctor.com pages
├── client-docs/      briefs, feedback, approval emails
└── inspiration/      competitor sites, UI references
```

## Notes

- Doctor headshots go here first, then copy the final cropped version to `/public/doctors/`
- Team/clinic photos go here, then copy to `/public/` once selected
- PDFs (milestone guides, forms) go here, then copy to `/public/resources/`
- This folder will never be pushed to git, so it is safe to store large files
