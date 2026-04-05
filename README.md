# 💰 Zorvyn — Personal Finance Dashboard

A modern, responsive, and visually polished Finance Dashboard built using React, TypeScript, and Tailwind CSS.
Designed to simulate real-world fintech UI/UX with clean architecture and scalable frontend practices.

---

## 🚀 Live Demo

👉 https://finance-dashboard-eight-rust.vercel.app

---

## 📌 Features

### 📊 Dashboard Overview

* Total Balance, Income, Expenses summary cards
* Balance trend visualization (Line Chart)
* Expense breakdown (Pie Chart)

### 💳 Transactions

* View transactions with:

  * Date
  * Category
  * Amount
  * Type (Income / Expense)
* Features:

  * Search by category
  * Filter by type
  * Sort by date / amount
* Admin can add/delete transactions

### 👤 Role-Based UI (Frontend Simulation)

* **Admin**

  * Add/Delete transactions
* **Viewer**

  * Read-only access
* Role switch available in UI

### 🧠 Insights

* Highest spending category
* Savings rate calculation
* Smart observation based on spending

### 🎨 UI/UX Highlights

* Modern fintech-inspired design
* Glassmorphism + gradient cards
* Smooth hover interactions
* Clean typography & spacing
* Fully responsive (mobile/tablet/desktop)
* Dark mode support

### 💾 State Management

* Zustand for global state
* LocalStorage persistence

---

## 🛠 Tech Stack

* React + Vite
* TypeScript
* Tailwind CSS
* Zustand
* Recharts
* Framer Motion

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── features/
 │   ├── dashboard/
 │   ├── transactions/
 │   ├── insights/
 ├── layouts/
 ├── pages/
 ├── store/
```

---

## ⚙️ Setup Instructions

```bash
# Clone repo
git clone <repo-url>

# Install dependencies
npm install

# Run project
npm run dev
```

---

## 📈 Evaluation Highlights

* Clean component architecture
* Scalable state management
* Responsive design across devices
* UX-focused interactions and edge cases
* Real-world dashboard experience

---

## ✨ Future Improvements

* API integration
* Export to CSV
* Advanced analytics
* Authentication system

---

## 👨‍💻 Author

Raj Zite
