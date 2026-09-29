# Hafsa Binta Azad - Artist Portfolio

A responsive, modern, single-page portfolio website for an upcoming artist, built with Vanilla JavaScript, HTML, and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive layout that adapts gracefully from desktop to mobile screens.
- **Sticky Header**: Elegant navigation bar with smooth scrolling to sections and a mobile hamburger menu.
- **Dynamic Portfolio**: A masonry-style gallery featuring client-side JavaScript filtering and an interactive modal lightbox for high-resolution images.
- **Events & News** (Currently Disabled): Clean interfaces for upcoming/past exhibitions and the latest artist updates.
- **Store Mockup** (Currently Disabled): A showcase for originals and limited edition prints with interactive toast notifications.
- **Spotlight Alert** (Currently Disabled): Dismissible top banner for important announcements.

## Disabled & Hidden Features Tracker

The following sections have been hidden from the UI (via the Tailwind `hidden` class) at the request of the artist, but the code remains intact for future use. To re-enable any of these features, simply locate their corresponding HTML tags and remove the `hidden` class.

| Feature | Location in `index.html` | Status |
| :--- | :--- | :--- |
| **Spotlight Alert Banner** | `<div id="spotlight-alert"...>` | 🔴 Hidden |
| **Events Section** | `<section id="events"...>` & Nav links | 🔴 Hidden |
| **News Section** | `<section id="news"...>` & Nav links | 🔴 Hidden |
| **Store Section** | `<section id="store"...>` & Nav links | 🔴 Hidden |

## Recent Updates

- **Actual Portfolio Data Integration**: Replaced placeholder artwork data with 26 actual optimized images from the `Art Photos` directory.
- **Artist Bio**: Added accurate biography and professional history based on the artist's LinkedIn profile.
- **Contact & Socials**: Updated the contact email and populated social links (LinkedIn, Facebook, Instagram) while removing the X (Twitter) reference.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) (Vanilla JS template)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via `gh-pages`

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashfiazad/ashfiazad.github.io.git
   cd ashfiazad.github.io
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Build & Deploy

To build the project for production:
```bash
npm run build
```

To automatically build and deploy the project to the `gh-pages` branch on your GitHub repository:
```bash
npm run deploy
```

> **Note**: For GitHub User Pages (`username.github.io`), ensure your repository settings under **Settings > Pages** point to the `gh-pages` branch as the source.
