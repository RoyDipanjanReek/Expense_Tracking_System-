# 💰 Expense Tracker

An intuitive web application to manage your personal finances. Track your budgets, add expenses, and visualize your spending patterns — all in one place.

---

## 🚀 Features

- 🔐 User Authentication (Clerk)
- 📊 Budget and Expense Tracking
- 📈 Interactive Bar Charts (Chart.js)
- 📁 View All Budgets & Individual Expense Lists
- ⚙️ Add, Edit, Delete Expenses
- 🌐 Responsive UI using TailwindCSS & Shadcn UI
- ☁️ Backend with MongoDB & Prisma (MongoDB connector)

## 🖥️ Tech Stack

| Frontend             | Backend                | Database | Libraries / Tools       |
| -------------------- | ---------------------- | -------- | ----------------------- |
| Next.js (App Router) | `API Routes (Next.js)` | MongoDB  | TailwindCSS, Shadcn UI  |
| React                | `Prisma ORM`           |          | Axios, Chart.js         |
| Clerk Auth           |                        |          | Vercel (for deployment) |

## 📦 Installation

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
npm install
```

## ⚙️ Setup
1. Set environment variables:

Create a .env file in the root directory and add:

```env
DATABASE_URL=mongodb+srv://<your-db-url>
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

2. Run the app:
``` bash
npm run dev
```
App will run at: http://localhost:3000


## 📁 Folder Structure

``` bash
/app
  /_components
  /(auth)
  /(routes)
  /api
  /db
  /models
/lib
  utils.js
```
