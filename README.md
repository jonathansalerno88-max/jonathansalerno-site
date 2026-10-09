# jonathansalerno.org

Source of my personal site. Static HTML, no build step.

```
index.html             the site itself
calculators/           clinical thresholds — BMI, pack-years, alcohol, activity
catalytic-plane/       interactive reader for Salerno 2026 (DMPK)
fonts/                 self-hosted IBM Plex, so no third-party request is made
_headers               cache and security headers for Cloudflare
```

Deployed by Cloudflare on every push to `main`.
