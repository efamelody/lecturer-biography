# lecturer-biography

# UKM Lecturer Profile Website

A clean, fast, and minimal academic personal website built using **Next.js**, **TypeScript**, and **Tailwind CSS**.

This project is designed for a university lecturer to showcase:

* Biography
* Research interests
* Awards
* Publications
* Contact information

---

## 🚀 Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Yarn
* Vercel (deployment)

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/ukm-prof-site.git
cd ukm-prof-site
```

Install dependencies:

```bash
yarn install
```

Run development server:

```bash
yarn dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🏗️ Project Structure

```
/app
  layout.tsx        # Root layout
  page.tsx          # Homepage

/components
  Navbar.tsx
  Hero.tsx
  Bio.tsx
  Research.tsx
  Publications.tsx
  Awards.tsx
  Footer.tsx

/content
  publications.json # Publications data
  research.json     # Research topics (optional)

/public
  profile.jpg       # Profile image
  cv.pdf            # Downloadable CV (optional)
```

---

## ✏️ Editing Content (Important)

This website is designed to be easy to update without coding knowledge.

### Update Biography

Edit:

```
/components/Bio.tsx
```

### Update Publications

Edit:

```
/content/publications.json
```

### Update Profile Image

Replace:

```
/public/profile.jpg
```

---

## 📄 Example Publications Format

```
[
  {
    "year": 2025,
    "title": "Tropospheric ozone trends and attributions...",
    "journal": "Atmospheric Chemistry and Physics"
  }
]
```

---

## 🚀 Deployment

This project is optimized for **Vercel**.

### Steps:

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Click Deploy

---

## 🌐 Domain

You can:

* Use a free `.vercel.app` domain
* Or connect a custom domain (e.g. `yourname.com`)

---

## 🎯 Design Goals

* Minimal and professional
* Academic-focused (not startup-style)
* Fast and lightweight
* Easy to maintain

---

## ⚠️ Notes

* No backend is required
* All content is static
* Keep layout simple for long-term maintainability

---

## 👨‍💻 Author

Developed using Next.js and Tailwind CSS.
