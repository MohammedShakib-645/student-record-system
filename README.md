<div align="center">

# 📚 Student Record Management System

### A premium web-based student management dashboard built with HTML, CSS and JavaScript

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-8b5cf6?style=for-the-badge&logo=github)](https://mohammedshakib-645.github.io/student-record-system/)
[![Source Code](https://img.shields.io/badge/Source%20Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/MohammedShakib-645/student-record-system)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 🌐 Live Demo

👉 **[mohammedshakib-645.github.io/student-record-system/](https://mohammedshakib-645.github.io/student-record-system/)**

> No login required. No server. Works entirely in the browser.

---

## 📌 About

**EduTrack** is a full-featured student record management dashboard built as a front-end web application. It allows adding, viewing, editing, searching and deleting student records — all stored persistently using the browser's `localStorage`.

This project was built to demonstrate:
- Full **CRUD operations** using vanilla JavaScript
- **LocalStorage** for persistent data without a backend
- Professional **sidebar dashboard UI** design
- **Live search**, **toast notifications**, and responsive layout

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ➕ **Add Students** | Full form with name, ID, branch, year, CGPA, email |
| 📋 **View All** | Table with color-coded badges and avatars |
| ✏️ **Edit Records** | Inline edit with pre-filled form |
| 🗑️ **Delete Records** | Confirmation prompt before deletion |
| 🔍 **Live Search** | Instant filter by name, ID or branch |
| 📊 **Dashboard Stats** | Total students, Avg CGPA, Top CGPA, At-Risk count |
| 🃏 **Student Cards** | Recent students shown as cards on dashboard |
| 🔔 **Toast Alerts** | Non-blocking success/error notifications |
| 💾 **Persistent Data** | localStorage — data survives page refresh |
| 🎨 **CGPA Badges** | 🟢 Good (≥8) · 🟡 Average (≥6) · 🔴 At Risk (<6) |

---

## 🛠️ Tech Stack

| Technology | Role |
|-----------|------|
| **HTML5** | Structure, semantic markup |
| **CSS3** | Dark sidebar layout, grid, flex, animations |
| **Vanilla JavaScript (ES6+)** | CRUD logic, localStorage, live search, toast |
| **Font Awesome** | Icons throughout the UI |
| **Google Fonts (Inter)** | Typography |

---

## 📁 Project Structure

```
student-record-system/
├── index.html        # Full sidebar dashboard layout (3 sections)
├── style.css         # Dark premium theme — sidebar, cards, table, badges
├── script.js         # CRUD logic, search, toast notifications, routing
└── README.md         # Project documentation
```

---

## 🖥️ App Sections

### 📊 Dashboard
- 4 stat cards: Total Students, Average CGPA, Top CGPA, At-Risk Count
- Recent 6 students shown as profile cards with initials avatars

### 👥 All Students
- Full table with student ID, name, branch, year, CGPA badge, status badge
- Edit (✏️) and Delete (🗑️) icon buttons per row

### ➕ Add Student
- Form fields: Student ID, Name, Branch (dropdown), Year (dropdown), CGPA, Email
- Validates input before saving
- Same form is reused for editing

---

## 🚀 How to Use

### Option 1 — Live (No Setup Required)
Visit: **[mohammedshakib-645.github.io/student-record-system/](https://mohammedshakib-645.github.io/student-record-system/)**

### Option 2 — Run Locally
```bash
# Clone the repository
git clone https://github.com/MohammedShakib-645/student-record-system.git

# Navigate to folder
cd student-record-system

# Open in browser
start index.html         # Windows
open index.html          # macOS
xdg-open index.html      # Linux
```

> No server needed. No npm install. Just open and use!

---

## 📊 How CGPA Badges Work

| CGPA Range | Badge | Status |
|-----------|-------|--------|
| 8.0 – 10.0 | 🟢 **Good Standing** | Green |
| 6.0 – 7.9 | 🟡 **Average** | Yellow |
| 0.0 – 5.9 | 🔴 **At Risk** | Red |

---

## 🎨 Design Highlights

- **Dark sidebar dashboard** (inspired by modern admin UIs)
- **Gradient avatars** auto-generated from student initials
- **Smooth transitions** on hover and section change
- **Toast notifications** instead of browser `alert()` popups
- **Responsive layout** — collapses on mobile screens

---

## 👨‍💻 Author

**Mohammed Shakib**
- 🌐 Portfolio: [mohammedshakib-645.github.io/portfolio/](https://mohammedshakib-645.github.io/portfolio/)
- 💼 GitHub: [@MohammedShakib-645](https://github.com/MohammedShakib-645)
- 📧 Email: 5645mohammedshakib@gmail.com

---

<div align="center">
⭐ Star this repo if you found it useful!
</div>
