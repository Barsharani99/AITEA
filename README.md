# AITEA - Austria India Trade & Education Association

This repository contains the frontend implementation of the AITEA (Austria India Trade & Education Association) website, a platform bridging trade, academic cooperation, tech innovation, culture, gastronomy, tourism, and sports exchange between Austria and India.

---

## 🛠️ Tech Stack & Architecture

The frontend is built on **Next.js** using the App Router, combining dynamic page routing with high-performance Static Site Generation (SSG):

* **Framework**: [Next.js](https://nextjs.org/) (App Router).
* **Component Model**: Native **HTML5 Web Components** (Custom Elements) loaded on the client side, maintaining full compatibility with the vanilla components model.
* **Styling**: Vanilla CSS utilizing CSS variables, responsive layouts, glassmorphism, and custom animations.
* **Localization (i18n)**: A custom client-side translation engine supporting English (`en`), German (`de`), and Hindi (`hi`), triggered automatically on client-side route transitions.

---

## 📂 Project Structure

```text
├── app/                     # Next.js App Router Pages & Components
│   ├── [[...slug]]/         # Catch-all dynamic route generating SSG HTML pages
│   │   └── page.js          
│   ├── membership-application/ # Dedicated route for dynamic wizard application form
│   │   └── page.js          
│   ├── ClientInit.js        # Global client-side bootstrapper and route change translation interceptor
│   └── layout.js            # Base HTML layout importing variables.css and main.css
├── public/                  # Static assets served at the root url path
│   ├── images/              # Website images
│   ├── locales/             # Translations (en.json, de.json, hi.json)
│   ├── sw.js                # Service worker for Unsplash caching
│   └── membership-application.js # Script copied at build time for form wizard bindings
├── src/                     # Source assets
│   ├── components/          # Native Web Components (AppHeader.js, AppFooter.js, etc.)
│   ├── styles/              # Global stylesheets (variables.css, main.css)
│   ├── i18n.js              # Localization translation engine
│   └── main.js              # Client application entry point
├── *.html                   # Static HTML templates (index.html, about.html, etc.)
├── package.json             # NPM package scripts & Next.js/React dependencies
└── next.config.mjs          # Next.js configurations & automated copy scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 1. Install Dependencies
Run the following command in the project root folder to install Next.js, React, and other dependencies:
```bash
npm install
```

### 2. Start the Development Server
To launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
To compile and build a production-ready application:
```bash
npm run build
```
