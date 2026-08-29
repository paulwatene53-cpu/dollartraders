# DollarTraders

AI-powered trading dashboard for Deriv.

## Production Website

https://dollartraders.vercel.app

## Custom Domain

https://dollertraders.site

## Features

1. Bot Builder
2. Free Bot
3. Premium AI Bot
4. Signal AI
5. Manual Trader
6. Bulk Trader
7. Copy Trader
8. Analysis Tool
9. Chart
10. Digit Analysis
11. Deriv account connection

## Technology

- Next.js
- React
- JavaScript
- CSS
- Vercel
- Deriv API / OAuth

## Project Structure

```text
dollartraders/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.js
│   │       └── callback/
│   │           └── route.js
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── next.config.mjs
├── package.json
└── README.md
```

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application normally runs at:

```text
http://localhost:3000
```

## Production

The production application is deployed through Vercel.

Production deployments are created from the `main` branch.

## Deriv OAuth

The application uses a server-side OAuth flow for connecting a user's Deriv account.

Required environment variables:

```text
DERIV_CLIENT_ID
DERIV_REDIRECT_URI
```

Production redirect URI:

```text
https://dollartraders.vercel.app/api/auth/callback
```

Do not place private credentials, access tokens, API tokens, or secrets directly in source code.

Store sensitive credentials in Vercel Environment Variables.

## Security

- OAuth state must be validated.
- PKCE should be used for OAuth authentication.
- OAuth tokens must not be exposed in frontend code.
- Never commit API tokens or secrets to GitHub.
- Trading actions should require explicit user authorization.
- Users should understand that trading involves financial risk.

## Disclaimer

DollarTraders is a trading software interface.

Trading involves risk, and past performance does not guarantee future results.

AI-generated analysis and signals are not guaranteed to be accurate or profitable.

Users are responsible for their own trading decisions.

## Deployment

The project is connected to Vercel and uses the `main` branch for production deployments.

Changes pushed to `main` can trigger a new Vercel production deployment when Git integration is enabled.

## License

Private project. All rights reserved.
