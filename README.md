# Sellable - Business Sale Accelerator

An AI-powered platform that helps business owners prepare, optimize, and sell their companies with confidence.

## Features

- **Seller Accelerator**: Guided assessment and preparation tools
- **Buyer Marketplace**: Pre-vetted businesses ready for acquisition
- **AI-Powered Scoring**: Automated readiness assessment
- **Peer Mentorship**: Connect with experienced sellers
- **Preparation Tools**: Templates, checklists, and guidance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sellable
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public pages (landing, about)
│   ├── (seller)/          # Seller-focused pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── data/                 # Mock data
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key Pages

- `/` - Landing page with CTA
- `/about` - Company information
- `/seller` - Seller onboarding
- `/seller/dashboard` - Accelerator dashboard
- `/seller/ready` - Sellable score & publish
- `/buyer` - Marketplace for buyers

## API Routes

- `GET /api/listings` - Fetch all business listings
- `GET /api/listings/[id]` - Fetch specific listing
- `POST /api/intake/seller` - Submit seller assessment
- `POST /api/publish` - Publish business listing
- `POST /api/mentors/request` - Request mentor help
- `GET /api/videos` - Fetch video content

## Development

### Adding New Components

1. Create component in `src/components/`
2. Export from component file
3. Import and use in pages

### Adding New Pages

1. Create page file in appropriate `app/` directory
2. Follow Next.js App Router conventions
3. Add routing as needed

### Styling

- Use Tailwind CSS classes
- Follow shadcn/ui patterns
- Maintain consistent spacing and colors

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
