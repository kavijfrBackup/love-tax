# Love Tax 💗
Romantic React/Vite prank website. Includes a runaway No button, Love Tax invitation, and a **hosted payment link** integration point.

## Run locally
1. Install Node.js 20+.
2. Run `npm install` and then `npm run dev`.
3. Open the localhost URL shown in your terminal.

## Enable an approved payment link
1. Get a compliant, personal-payment-eligible hosted link from your payment provider. For Sri Lanka, ask HNB about **HNB Accept** or another provider about personal gifts.
2. Copy `.env.example` to `.env.local`.
3. Fill in `VITE_PAYMENT_LINK`, `VITE_RECIPIENT_NAME`, and `VITE_AMOUNT_LABEL` with the **actual** payment currency and amount configured at the provider.
4. Rebuild/deploy. Vite environment variables prefixed with `VITE_` are public in browser code: put only a public checkout URL here, **never merchant secret keys or bank account numbers**.

## Deploy to Vercel
1. Push this directory to a GitHub repository.
2. Vercel → Add New Project → Import the repository → Framework Preset: Vite → Build: `npm run build` → Output: `dist`.
3. Configure the same VITE_ environment variables in Project Settings → Environment Variables.
4. Redeploy after setting them; connect a custom domain in Project Settings → Domains and follow DNS instructions.

## Payment verification
The website **does not verify real payments**. After opening the hosted checkout, tapping 'I've completed the checkout' only opens a pending screen. Do not treat it as proof of payment. Real automatic confirmation requires a provider-approved server-side webhook/verification API and a backend order/session identifier, with signature verification and replay protection. The romantic final love note can be opened without paying; no pressure or false collection claims.
