# AbleHearts Foundation Website

A modern, accessible React website for the AbleHearts Foundation - empowering individuals with disabilities in Botswana.

## CRITICAL: Security Setup Required

Before running this application, you MUST configure environment variables for security.

### Quick Setup
1. Copy `.env.example` to `.env`
2. Fill in your Firebase credentials in `.env`
3. Run `npm install`
4. Run `npm run dev`

### Required Environment Variables

Create a `.env` file with:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GA4_MEASUREMENT_ID=your_ga4_measurement_id
VITE_ENABLE_ANALYTICS=true
```

## Features

- Modern React 18 with Vite
- Accessibility features (dyslexia mode, screen reader support)
- Performance optimized with image optimization and caching
- SEO ready with dynamic meta tags
- Security hardened with environment variables
- Mobile responsive design
- Google Analytics 4 integration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Notes

- Never commit .env files to version control
- All sensitive data is stored in environment variables
- Environment variables are validated at startup
- Production features are properly gated

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── utils/              # Utility functions (analytics, security, performance)
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── styles/             # Global styles and design system
└── assets/             # Images and static assets
```

## Deployment

Set environment variables in your hosting platform before deploying.

## Support

For questions or support, please contact the AbleHearts Foundation development team.