# LeetCode Mastery

A modern web application designed to help developers track and improve their LeetCode problem-solving journey. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 **Problem Journal**: Track your problem-solving journey with detailed entries
- 🎯 **Solution Tracking**: Document your approach, implementation, and learnings
- 📊 **Progress Analytics**: Monitor your progress across different problem types and difficulties
- 🎨 **Modern UI**: Clean and intuitive interface with dark mode support
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion animations
- **State Management**: React Hooks
- **API Integration**: Custom API services
- **Date Handling**: Custom date utilities
- **Code Quality**: ESLint, Prettier

## Project Structure

```
web/
├── app/                 # Next.js app router pages
├── components/         # Reusable React components
│   ├── ui/            # Basic UI components
│   └── forms/         # Form-related components
├── lib/               # Library code, constants, and configurations
├── services/          # API and external service integrations
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and helpers
└── public/            # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/leetcode-mastery.git
   cd leetcode-mastery/web
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the web directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Code Style

- We use ESLint and Prettier for code formatting
- Follow the TypeScript strict mode guidelines
- Use functional components with hooks
- Implement proper error handling and loading states

### Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use proper TypeScript types
   - Implement proper error boundaries
   - Add loading states for async operations

2. **State Management**

   - Use React hooks for local state
   - Implement proper data fetching patterns
   - Handle loading and error states

3. **Performance**

   - Implement proper code splitting
   - Use Next.js image optimization
   - Implement proper caching strategies

4. **Accessibility**
   - Use semantic HTML
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain proper color contrast

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
