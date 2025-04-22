# 🩺 Task Medical by Sahid

A fully responsive and accessible task to get a job.

## 📌 Overview

This app allows users to:
- View a list of doctors with details such as specialty, location, availability, and rating.
- Filter doctors by **specialty** and **availability**.
- **Book appointments** with a specific doctor by selecting from available time slots.
- **View all booked appointments** in a summary view.
- **Delete appointments** when needed.

---

## ⚙️ Tech Stack

- **React** (created using Bolt)
- **TailwindCSS** for styling
- **React Context API** for managing global state
- **JSON** for mock data (no backend)

---

## 🚀 Getting Started

Clone the repository and run:

```bash
npm install
npm run dev

🤖 AI Tools Used
I used AI tools like Cursor and ChatGPT to:
Scaffold the initial structure of the project
Ensure accessibility and responsive layout best practices

📋 Features
📇 Doctor cards showing name, specialty, rating, availability, and a "Book Appointment" button
📅 Booking modal with doctor name, time slots, and confirmation action
🧾 "My Appointments" section listing all booked appointments
🔍 Dynamic filters for availability and specialties
♿ Keyboard navigation and accessible structure (ARIA tags, roles, etc.)

⚠️ Known Limitations
Users can only book one appointment per doctor per day.
This is intentional, as it makes sense that one user shouldn’t be able to book every slot for the same doctor.

No backend – all data is local and static via JSON.

📎 Future Improvements (optional)
Prevent booking past time slots
Add backend integration for real data persistence
User authentication and account management

Built by Sahid Jiménez
www.sahidjimenez.info