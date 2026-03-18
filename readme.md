# Lipana Payment Page

A full-stack M-Pesa STK Push payment page using the Lipana SDK.

## Stack
- **Frontend** — Vanilla HTML/CSS/JS (dark cinematic UI), served from `/public`
- **Backend** — Node.js + Express + `@lipana/sdk`

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure your API key
cp .env.example .env
# Then edit .env and set LIPANA_SECRET_KEY=your_key_here

# 3. Start the server
npm start
# → http://localhost:3000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/`  | Serves the payment page |
| `POST` | `/api/pay` | Initiates STK Push |
| `POST` | `/api/webhook` | Receives Lipana payment callbacks |
| `GET`  | `/api/transactions` | Lists recent transactions |

### POST `/api/pay` — Request Body
```json
{ "phone": "+254712345678", "amount": 500 }
```

### POST `/api/pay` — Success Response
```json
{ "success": true, "transactionId": "TXN_xxx", "message": "STK Push sent!" }
```

## Webhook
Set your Lipana webhook URL to:
```
https://your-domain.com/api/webhook
```

## Notes
- Uses **production** mode by default. Change `environment: 'sandbox'` in `server.js` for testing.
- The frontend talks to the backend at `/api/pay` — no API key ever touches the browser.