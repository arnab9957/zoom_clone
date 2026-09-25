# Zoom Clone

A comprehensive, state-of-the-art video conferencing application built with Next.js, Stream Video SDK, and Clerk Authentication, designed to provide a seamless and secure meeting experience.

## ✨ Detailed Features

- **🔒 Authentication & Authorization**
  - Secure sign-in and sign-up functionality powered by Clerk.
  - Protected routes to ensure only authenticated users can access the dashboard and meeting rooms.

- **🏠 Home Dashboard**
  - Quick action cards to instantly Start a New Meeting, Join a Meeting, Schedule a Meeting, or view Recordings.
  - Interactive **Recent Activity** and **Upcoming Meetings** sections.
  - Resizable panels layout for a flexible, customizable workspace.
  - Built-in **Todo List** module to track action items directly from the dashboard.

- **📅 Meeting Management**
  - **Instant Meetings**: Start a meeting instantly and generate a shareable link.
  - **Schedule Meetings**: Plan ahead by scheduling a meeting for a specific date and time using an intuitive calendar/date-picker interface.
  - **Join via Link/ID**: Easily join active meetings by pasting an invitation link or meeting ID.

- **🎥 Advanced Meeting Room Experience (powered by Stream)**
  - **Real-time Video & Audio**: Low-latency, high-quality audio and video communication.
  - **Device Management**: Flexible meeting setup screen to configure camera and microphone before joining.
  - **Meeting Controls**: Mute/unmute microphone, start/stop camera, and a secure "End Call for All" feature (for hosts).
  - **Flexible Layouts**: Speaker view and grid view layouts for participants.

- **📊 Meeting History & Assets**
  - **Upcoming Meetings**: A dedicated view to track and manage all future scheduled meetings.
  - **Previous Meetings**: Access a complete log of your past meetings and attendance.
  - **Meeting Recordings**: Review and share recorded video sessions of previous calls.

- **🚪 Personal Room**
  - A permanent, dedicated meeting room with a static, personalized URL.
  - Perfect for instant 1-on-1s, recurring syncs, or office hours without needing to schedule a new meeting.

- **👤 User Profile**
  - A dedicated profile page to manage user settings and view personal statistics (potentially utilizing integrated charts via Recharts).

- **🎨 Modern, Responsive UI/UX**
  - Fully responsive design that adapts flawlessly across mobile, tablet, and desktop devices (includes a dedicated Mobile Navigation menu).
  - Modern, accessible UI components utilizing Radix UI (Dialogs, Modals, Popovers, Tabs, Dropdowns).
  - Beautiful notifications and toast messages (via Sonner).
  - Built-in **Dark Mode** and theme toggling capabilities.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management & Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Video & Audio SDK**: [GetStream (Stream Video SDK)](https://getstream.io/video/)
- **Date & Time Handling**: date-fns, React Datepicker
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

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
