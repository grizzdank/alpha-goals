# Alpha Goals

A modern, user-friendly goal-tracking application built with React and Supabase. Break down your annual ambitions into actionable daily tasks with a beautiful glassmorphism UI.

## Features

- 🎯 **Goal Tracking**: Set and track your goals with an intuitive interface
- 📊 **Progress Visualization**: Monitor your progress with beautiful circular progress indicators
- 🔄 **Sprint Management**: Organize your goals into 90-day sprints
- 👥 **User Profiles**: Secure authentication and personalized goal tracking
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates**: Instant feedback on your progress

## Tech Stack

- **Frontend**:
  - React 18 with TypeScript
  - Vite for blazing fast development
  - Tailwind CSS for styling
  - shadcn/ui for beautiful, accessible components
  - React Query for efficient data fetching
  - React Router for navigation

- **Backend**:
  - Supabase for database and authentication
  - Row Level Security for data protection
  - Real-time subscriptions for live updates

## Getting Started

1. **Prerequisites**:
   - Node.js 18+ and npm
   - Git

2. **Installation**:
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/alpha-goals.git
   cd alpha-goals

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=your_app_url
```

## Deployment

This project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Add the environment variables in Vercel's dashboard
3. Deploy!

## License

This project is licensed under the Business Source License 1.1 (BSL 1.1). The key points of the license are:

- Copyright (c) 2024 LFG Consulting LLC
- You CAN:
  - Copy, modify, and create derivative works
  - Use for non-production purposes
  - Use in production as long as you're not creating a Goal Tracking Service
- You CANNOT:
  - Use this to create a competing Goal Tracking Service
  - Remove or modify the license terms
- After March 25, 2027, the code will be available under the GNU General Public License version 3 (GPL v3)
  - Any modifications must also be open-sourced
  - Includes patent protection
  - Preserves user freedoms

For commercial licensing inquiries, please contact: legal@alpha-goals.com

See the [LICENSE](LICENSE) file for the complete BSL 1.1 terms.

## Contributing

By contributing to Alpha Goals, you agree that your contributions will be licensed under the same BSL 1.1 terms.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Frontend development assisted by [Lovable.dev](https://lovable.dev/)
