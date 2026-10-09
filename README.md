# jonathansalerno.org

Source of my personal site. Static HTML, no build step.

```
wrangler.jsonc         Cloudflare config — serves public/ as the site
public/index.html      the site itself
public/calculators/    clinical thresholds — BMI, pack-years, alcohol, activity
public/catalytic-plane/  interactive reader for Salerno 2026 (DMPK)
public/fonts/          self-hosted IBM Plex, so no third-party request is made
public/_headers        cache and security headers for Cloudflare
```

Deployed by Cloudflare on every push to `main`.
