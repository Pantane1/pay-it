# Privacy Policy

**Last updated:** March 2026

---

## Overview

This payment page is powered by the Lipana SDK and processes M-Pesa payments via Safaricom's Daraja API. This document explains what data is collected, how it is used, and how it is protected.

---

## What Data We Collect

When you use this payment page, the following data is submitted:

| Data | Purpose |
|------|---------|
| **M-Pesa phone number** | Required to initiate the STK Push to your phone |
| **Payment amount** | Required to process the transaction |

We do **not** collect:
- Your name
- Email address
- Location data
- Cookies or tracking identifiers
- Any data beyond what is required to process the payment

---

## How Your Data Is Used

Your phone number and payment amount are sent to:

1. **Our backend server** — to validate input and initiate the STK Push
2. **Lipana** — a payment processing platform that communicates with Safaricom's M-Pesa API
3. **Safaricom / M-Pesa** — to deliver the payment prompt to your phone and process the transaction

Your data is used solely to complete the payment you initiate. It is not sold, rented, or shared with any third party for marketing or analytics purposes.

---

## Data Retention

- Phone numbers and amounts submitted through this page are not stored in a database by default
- Transaction IDs returned by Lipana may be logged server-side for debugging and reconciliation purposes
- Lipana and Safaricom retain transaction records in accordance with their own privacy policies and Kenyan financial regulations

---

## Third-Party Services

This application relies on:

- **Lipana** (lipana.dev) — Payment processing. Review their privacy policy at their website.
- **Safaricom M-Pesa** — Mobile money infrastructure. Governed by Safaricom's terms and Kenya's Data Protection Act, 2019.

---

## Security

All communication between your browser and our server is transmitted over HTTPS in production. Your M-Pesa PIN is entered directly on Safaricom's secure STK Push prompt on your device — it is never transmitted through or visible to this application.

See [SECURITY.md](./SECURITY.md) for details on our security practices.

---

## Your Rights

Under Kenya's **Data Protection Act, 2019**, you have the right to:
- Know what personal data we hold about you
- Request correction or deletion of your data
- Withdraw consent for data processing

To exercise these rights, contact the repository owner via GitHub.

---

## Changes to This Policy

This policy may be updated from time to time. The date at the top of this document reflects the most recent revision.
