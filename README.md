# StreamHub - Your 24/7 Streaming Platform

StreamHub is a modern web application that allows users to create their own TV channels using YouTube playlists. Stream content 24/7 and build your audience with our easy-to-use platform.

## Features

- 🎥 Create 24/7 streaming channels
- 📺 YouTube playlist integration
- 💬 Live chat functionality
- 📊 Real-time analytics
- 🎮 Demo channels without registration
- 👥 User authentication
- 📱 Responsive design

## Tech Stack

- Frontend:
  - React with TypeScript
  - Tailwind CSS for styling
  - React Query for data fetching
  - React Router for navigation
  - Lucide React for icons

- Backend:
  - Node.js with Express
  - SQLite with Drizzle ORM
  - JWT for authentication

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/streamhub.git
   cd streamhub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_jwt_secret_here
   ```

4. Initialize the database:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Deploying to Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

The application will automatically handle routing through the `netlify.toml` configuration.

### Backend Deployment

For the backend API:

1. Choose a hosting provider (e.g., Railway, Heroku)
2. Set up environment variables
3. Configure the database connection
4. Update the frontend API base URL

## Project Structure

```
streamhub/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── db/            # Database schema and migrations
│   ├── lib/           # Utility functions and API client
│   ├── pages/         # Page components
│   └── server/        # Backend API code
├── public/            # Static assets
└── migrations/        # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@streamhub.com or join our Discord community.