# Security Policy

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |

---

## Security Practices

### API Key Protection
- The Lipana secret key is stored in a `.env` file and loaded via `dotenv` at runtime
- The `.env` file is listed in `.gitignore` and must **never** be committed to version control
- The API key is only accessed server-side — it is never exposed to the browser or included in frontend code
- In production, the key must be set as a platform environment variable (e.g., Railway, Render) — never hardcoded

### Input Validation
- Phone numbers are validated against Kenyan number formats (`07XXXXXXXX` or `+2547XXXXXXXX`) before any API call is made
- Payment amounts are validated to be positive numbers of at least KES 1
- All validation happens on the backend, not just the frontend

### CORS
- CORS is enabled via the `cors` package. In production, restrict allowed origins to your specific frontend domain:

```javascript
app.use(cors({ origin: "https://your-domain.com" }));
```

### HTTPS
- Always deploy behind HTTPS in production. Never expose this server over plain HTTP
- Use a reverse proxy (Nginx, Caddy) or a platform that handles TLS automatically

### Webhook Security
- The `/api/webhook` endpoint receives callbacks from Lipana
- In production, validate that incoming webhook requests originate from Lipana by verifying request signatures or IP allowlisting as documented in the Lipana developer docs
- Never trust webhook payload data without verification

### M-Pesa PIN
- The user's M-Pesa PIN is entered on Safaricom's native STK Push prompt on their device
- The PIN is never transmitted through, stored in, or visible to this application at any point

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email the repository owner directly or open a private security advisory on GitHub
3. Include a clear description of the vulnerability, steps to reproduce, and potential impact
4. Allow reasonable time for a fix before any public disclosure

We take all security reports seriously and will respond as quickly as possible.

---

## Dependency Security

Keep dependencies up to date to avoid known vulnerabilities:

```bash
npm audit
npm audit fix
```

Run `npm audit` regularly, especially before deploying to production.
