# samyak.social — static site

This repository contains a tiny single-file static website for the domain `samyak.social`.

Files:
- `index.html` — the site (single-file, responsive, no build step)
- `CNAME` — contains `samyak.social` for GitHub Pages custom domain

How to host

1) GitHub Pages (recommended)

- Create a GitHub repo (or push this folder to `github.com/<you>/samyak.social`).
- In the repository settings > Pages, select the `main` branch and root folder as the source.
- The `CNAME` file configures the custom domain to `samyak.social`.

DNS

Create a DNS A record(s) pointing your domain to the host. For GitHub Pages, add these A records:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

Alternatively you can use an ALIAS/ANAME to `username.github.io` depending on your DNS provider.

2) Cloudflare Pages or Netlify

- Connect the repository to Cloudflare Pages or Netlify and configure the custom domain `samyak.social`. No build command required.

Verification (Windows PowerShell commands)

Check DNS records:

nslookup samyak.social

Check HTTP response (PowerShell)::

Invoke-WebRequest -Uri http://samyak.social -UseBasicParsing

If you push and enable Pages, wait a few minutes for DNS/HTTPS to provision.

Notes

- If you already use Cloudflare for DNS, add the domain in Pages/Netlify and point the domain to the recommended targets. For Cloudflare proxy (orange cloud), the host may require alternative verification — follow provider docs.
- To update the site, edit `index.html` and push changes.
