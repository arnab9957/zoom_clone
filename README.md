# Zoom Clone

A comprehensive video conferencing application built with Next.js and Stream, designed to provide a seamless meeting experience.

## ✨ Features

- **Authentication**: Secure sign-in and sign-up functionality using Clerk.
- **Home**: Quick access to meeting controls (New Meeting, Join Meeting, Schedule, Recordings).
- **Upcoming Meetings**: View and join scheduled future meetings.
- **Previous Meetings**: Access history of past meetings.
- **Recordings**: Review recorded video sessions.
- **Personal Room**: A dedicated permanent meeting room for instant access.
- **Real-time Video/Audio**: High-quality video and audio conferencing powered by GetStream.
- **Responsiveness**: Fully responsive design for all device sizes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Video SDK**: [GetStream](https://getstream.io/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/arnab9957/zoom_clone.git
    cd zoom_clone
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env` file in the root directory and add the following keys. You will need to obtain these from your Clerk and Stream dashboards.

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
    CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
    CLERK_SIGN_UP_FORCE_REDIRECT_URL=/

    # GetStream Video SDK
    NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
    STREAM_SECRET_KEY=your_stream_secret_key

    # App Base URL
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
