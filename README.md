<div align="center">

# ⚡ JobTracker

**Organize your job search in style.**

A sleek dashboard to track all your applications,
interviews, and offers — with a Liquid Glass UI.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-BD34FE?style=flat-square&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Sign up & log in with per-user persistence |
| 📊 **Dashboard** | Stats cards + interactive pie chart |
| 📝 **Full CRUD** | Create, edit, and delete job applications |
| 🏷️ **Color Badges** | Status and priority with intuitive colors |
| 📱 **Fully Responsive** | Collapsible sidebar and adaptive layout |
| 🎨 **Liquid Glass UI** | Design inspired by Apple's design language |

## 🛠️ Tech Stack

```
React 18 · TypeScript · Vite · Tailwind CSS 4 · Recharts · Lucide Icons
```

## 📸 Preview

<div align="center">

> _Add screenshots here_

</div>

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/owanner/job-tracker.git
cd job-tracker

# Install dependencies
npm install

# Start dev server
npm run dev

# Open
open http://localhost:5173
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview build
npm run preview
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/owanner/job-tracker)

1. Click the button above or import the repo on [Vercel](https://vercel.com)
2. Framework: **Vite**
3. Build Command: `npm run build`
4. Output: `dist`
5. 🚀 Ship it!

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Glass design system
│   │   ├── GlassCard.tsx
│   │   ├── GlassInput.tsx
│   │   ├── GlassSelect.tsx
│   │   ├── GlassButton.tsx
│   │   └── Modal.tsx
│   ├── Layout.tsx       # Sidebar + Header
│   ├── Dashboard.tsx    # Stats + Pie Chart
│   ├── JobList.tsx      # Applications list
│   ├── JobForm.tsx      # Create/edit modal
│   ├── LoginPage.tsx    # Login screen
│   └── RegisterPage.tsx # Registration screen
├── contexts/
│   ├── AuthContext.tsx   # Auth state management
│   └── JobContext.tsx    # Job state management
├── data/
│   └── dropdowns.ts     # Select options + color maps
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Design System

Liquid Glass is built with Tailwind utilities:

```css
/* Glass Card */
bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] rounded-2xl

/* Glass Input */
bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-xl

/* Glass Button */
bg-gradient-to-r from-purple-500/80 to-blue-500/80
```

## 📋 Tracked Fields

- Company, Role, Location, Country
- Job Link, Platform
- Application Date, Status
- Salary, Currency
- Recruiter, Contact Info
- Last Updated
- Next Action + Due Date
- Priority, Current Stage
- Notes, Result

## 📄 License

MIT © [Your Name](https://github.com/owanner)
