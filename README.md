# Prism Landscaping

A modern, responsive, high-performance landscaping web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌿 Overview

Prism Landscaping is an end-to-end web platform designed for premium landscaping and garden maintenance services. It features rich visual storytelling, dynamic CMS blog routing, detailed service showcases, interactive quote requests, and optimized responsive layouts across desktop, tablet, and mobile devices.

---

## ✨ Features

- **Homepage**: Hero showcase, services carousel/grid, company story, gallery portfolio, customer testimonials, interactive FAQ accordion, and booking CTA banner.
- **About Us**: Detailed company narrative, core values, mission & vision, dynamic stats counter, embedded video showcase, and team directory.
- **Services Showcase**: Service catalog covering lawn care, hardscaping, aeration, soil conditioning, garden bed designs, and pest control.
- **Dynamic Blog CMS**: Full blog listing and slug-based article detail pages (`/blog/[slug]`) driven by a structured TypeScript CMS dataset with inline media.
- **Testimonials & Social Proof**: Verified customer reviews and ratings.
- **Interactive Modals**: Multi-step quote request modal accessible across pages.
- **Contact & Inquiry**: Dedicated contact page with location details and inquiry forms.
- **Privacy & Legal**: Standard privacy policy and terms layout.
- **Custom 404 Experience**: Dedicated branded 404 page with navigation fallbacks.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v20+ recommended).

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/zahidhossin39/Prism-Landscaping.git
cd Prism-Landscaping
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
├── public/
│   ├── assets/        # Visual media, logos, photography, illustrations
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   │   ├── about/     # About Us route
│   │   ├── blog/      # Blog index & [slug] dynamic routes
│   │   ├── contact-us/# Contact route
│   │   ├── service/   # Services catalog route
│   │   ├── testimonials/ # Customer reviews route
│   │   ├── privacy/   # Privacy policy route
│   │   └── not-found.tsx # Custom 404 handler
│   ├── components/    # Reusable modular UI components
│   └── data/          # CMS data & content models
```

---

## 📄 License

This project is licensed under the MIT License.
