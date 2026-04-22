# 💳 Lipana Payment Page

A production-ready M-Pesa STK Push payment page built with Node.js, Express, and the Lipana SDK.

---

## How It Works..

1. The user enters their **M-Pesa phone number** and selects an **amount** on the payment page
2. They click **Send STK Push**
3. The frontend sends a `POST /api/pay` request to the Express backend
4. The backend uses the **Lipana SDK** to trigger an STK Push to the user's phone via Safaricom's Daraja API
5. The user receives a **PIN prompt** on their phone and approves the payment
6. Lipana sends a **webhook callback** to `/api/webhook` with the final transaction status

```
Browser → POST /api/pay → Express Server → Lipana SDK → M-Pesa STK Push → User's Phone
                                                  ↓
                                         Webhook Callback → /api/webhook
```

---

## Project Structure

```
lipana-payment/
├── server.js          # Express backend — API routes & Lipana SDK calls
├── package.json       # Dependencies
├── .env               # Your secret keys (never commit this)
├── .env.example       # Template for environment variables
├── .gitignore         # Keeps .env and node_modules out of Git
├── README.md          # You are here
├── PRIVACY.md         # Privacy policy
├── SECURITY.md        # Security practices & vulnerability reporting
├── LICENSE            # MIT License
└── public/
    └── index.html     # Frontend payment UI
```

---

## Setup & Installation

### Prerequisites
- Node.js v18 or higher
- A [Lipana](https://lipana.dev) account with a secret API key

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/your-username/lipana-payment.git
cd lipana-payment

# 2. Install dependencies
npm install

# 3. Set up environment variables
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux

# 4. Open .env and add your Lipana secret key
# LIPANA_SECRET_KEY=lsk_live_xxxxxxxxxxxxxxxxxxxx

# 5. Start the server
npm start
```

Visit `http://localhost:3000` in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the payment page |
| `POST` | `/api/pay` | Initiates M-Pesa STK Push |
| `POST` | `/api/webhook` | Receives Lipana payment callbacks |
| `GET` | `/api/transactions` | Lists recent transactions |

### POST `/api/pay`

**Request body:**
```json
{
  "phone": "0712345678",
  "amount": 500
}
```

**Success response:**
```json
{
  "success": true,
  "transactionId": "TXN17739004580558TDPQ0",
  "message": "STK Push sent! Check your phone for the M-Pesa prompt."
}
```

**Error response:**
```json
{
  "success": false,
  "message": "Invalid Kenyan phone number."
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LIPANA_SECRET_KEY` | Yes | Your Lipana production or sandbox secret key |
| `PORT` | Optional | Server port (defaults to `3000`) |

---

## Deployment

When deploying to production (Railway, Render, etc.):

1. Set `LIPANA_SECRET_KEY` as an environment variable on the platform — never in a file
2. Update the `fetch` URL in `public/index.html` from `http://localhost:3000/api/pay` to your live server URL
3. Set your **Lipana webhook URL** in your dashboard to `https://your-domain.com/api/webhook`
4. Change `environment: "sandbox"` to `environment: "production"` in `server.js` if not already set

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 4
- **Payments:** @lipana/sdk
- **Frontend:** Vanilla HTML/CSS/JS
- **Config:** dotenv

---

## License

MIT — see [LICENSE](https://github.com/Pantane1/pay-it/blob/main/LICENSE)


<p align="center">
  <a href="#"><img src="https://github.com/Pantane1/nf/blob/main/public/ph.png" alt="ph-logo">
</p>

<p align="center">
  <a href="#"><img src="http://readme-typing-svg.herokuapp.com?color=ACAF50&center=true&vCenter=true&multiline=false&lines=Built+Different" alt="pantane">
</p>
