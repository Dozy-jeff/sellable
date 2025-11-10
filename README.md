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
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Backend**: Firebase

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

## Firebase Setup

This project uses Firebase for authentication and data storage. The Firebase configuration is already included in `src/lib/firebase.ts`.

### Firebase Services Used

- **Firebase Authentication**: User login/signup with email and password
- **Cloud Firestore**: NoSQL database for storing user profiles, seller intake data, readiness results, and completed tasks

### Firestore Data Structure

The app stores data in the following structure:

```
users (collection)
└── {userId} (document)
    ├── uid: string
    ├── email: string
    ├── displayName: string
    ├── role: "seller" | "buyer"
    ├── createdAt: Timestamp
    ├── updatedAt: Timestamp
    ├── sellerIntake: SellerIntake (optional)
    ├── readinessResult: ReadinessResult (optional)
    └── completedTasks: string[] (optional)
```

### Firebase Security Rules

To secure your Firestore database, add these rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Authentication Features

- Email/password authentication
- Password reset functionality
- Protected routes (dashboard pages require login)
- Automatic user profile creation on signup
- User session persistence

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public pages (landing, about, login, signup)
│   ├── (seller)/          # Seller-focused pages (protected)
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ProtectedRoute.tsx # Auth wrapper for protected pages
│   └── ...               # Custom components
├── contexts/              # React contexts
│   └── AuthContext.tsx   # Authentication context provider
├── data/                 # Mock data
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase initialization
│   ├── auth.ts           # Authentication helpers
│   └── firestore.ts      # Firestore database helpers
└── types/                # TypeScript type definitions
```

## Key Pages

- `/` - Landing page with CTA
- `/about` - Company information
- `/login` - User login page
- `/signup` - User registration page
- `/seller` - Seller onboarding (protected)
- `/seller/dashboard` - Accelerator dashboard (protected)
- `/seller/ready` - Sellable score & publish (protected)
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
