# Joineazy – Assignment & Review Dashboard (Frontend Intern Task 1)

> **Candidate:** Pagadam Setty Yasaswini  
> **Repository:** [https://github.com/214G1A05C2/join-easy_task1.git](https://github.com/214G1A05C2/join-easy_task1.git)  
> **Live Production URL:** [https://agile-violet-swzuxmu.tmp.now](https://agile-violet-swzuxmu.tmp.now)  
> **Role:** Frontend Intern Assignment – Task 1  
> **Tech Stack:** React 19, Vite, Tailwind CSS, Lucide React, LocalStorage, Vercel

---

## 📌 Project Overview

The **Joineazy Assignment & Review Dashboard** is a high-performance, responsive Single-Page Application (SPA) tailored for academic coursework management. It provides role-specific dashboards for **Instructors / Professors (Admins)** and **Students**, featuring real-time submission tracking, 2-step confirmation workflows, progress metrics, and persistent client-side data management.

> ⚠️ **Important Architecture Note:** This application uses client-side mock authentication and persistent `localStorage`. In accordance with assignment specifications, file deliverables are submitted via external Google Drive repository folders and no actual file blobs are uploaded to the browser client or any paid backend.

---

## ✨ Key Features

### 🔐 1. Mock Authentication & Role Access
* **Two distinct user roles:** Admin/Professor and Student.
* Pre-seeded accounts with 1-click **Quick Login** buttons for instant evaluation.
* **Strict Route Guards:** Students cannot view admin pages or other students' assignments; Admins can only view and manage coursework they created.
* Session and state persistence across page refreshes via `localStorage`.

### 🎓 2. Student Dashboard
* **Personalized Welcome & Summary:** Displays student name, student ID, date, and overall progress.
* **Interactive Metric Cards:** Total assigned coursework, completed/submitted tasks, pending tasks, and overdue assignments.
* **Overall Progress Bar:** Dynamically calculates academic completion rate (`submitted / total * 100`).
* **Coursework Cards:**
  * Title, full description, and instructor information.
  * Due date with prominent **Overdue highlighting** for past-deadline assignments.
  * Direct clickable link to the instructor's Google Drive submission folder.
  * Submission timestamp display upon completion.
* **Two-Step Submission Confirmation Workflow:**
  * **Step 1:** Verifies that the student has uploaded their work to the designated Google Drive folder.
  * **Step 2:** Final confirmation prompt to prevent accidental submission.
  * Prevents duplicate submissions and displays instant feedback toasts.
* **Search, Filter & Sort:** Filter by `All`, `Pending`, `Submitted`, and `Overdue`; sort by due date.

### 👨‍🏫 3. Admin / Professor Dashboard
* **Dynamic Analytics:**
  * Total coursework assignments created.
  * Total student allocations across all tasks.
  * Submitted vs. Pending counts.
  * Dynamic **Class Completion Rate** calculated via:  
    $$\text{Completion Rate} = \left(\frac{\text{Number of Submitted Students}}{\text{Total Assigned Students}}\right) \times 100$$
* **Complete CRUD Operations:**
  * **Create Assignment:** Title, description, due date, Google Drive link, and multi-select student allocation (or "Assign to all").
  * **Edit Assignment:** Modifies details and preserves existing submission records for students who remain assigned.
  * **Delete Assignment:** Protected with a destructive confirmation dialog.
* **Student-wise Submission Tracking Table:**
  * Live status table listing Student Name, Email, Assignment, Due Date, Status Badge, and Submission Timestamp.
  * Filter by specific assignment and submission status.
  * Search by student name, email, or coursework title.
  * Sortable columns with indicator arrows.

### 🎨 4. Modern SaaS UI/UX
* Indigo & violet color palette with high-contrast text and rounded cards.
* Light & Dark mode toggle with persistent preferences.
* Fully responsive desktop sidebar and mobile navigation drawer.
* Accessible keyboard navigation (ESC modal dismiss, ARIA labels, focus states).
* Floating notification toast system for non-blocking feedback.
* "Reset Demo Data" option to restore clean seed data anytime during evaluations.

---

## 👥 Demo Credentials

| Role | Name | Email | Password |
|---|---|---|---|
| **Admin 1** | Dr. Robert Vance | `admin1@joineazy.com` | `demo123` |
| **Admin 2** | Prof. Elena Rostova | `admin2@joineazy.com` | `demo123` |
| **Student 1** | Alex Johnson | `student1@joineazy.com` | `demo123` |
| **Student 2** | Priya Sharma | `student2@joineazy.com` | `demo123` |
| **Student 3** | Liam Chen | `student3@joineazy.com` | `demo123` |
| **Student 4** | Sophia Rodriguez | `student4@joineazy.com` | `demo123` |
| **Student 5** | David Kim | `student5@joineazy.com` | `demo123` |

> 💡 **Quick Login Tip:** On the login screen, click on any account badge under **"1-Click Quick Demo Login"** to log in instantly without typing.

---

## 📂 Project Directory Structure

```
join-easy_task1/
├── public/                     # Static icons & assets
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/
│   │   ├── admin/              # Admin components
│   │   │   ├── AdminAssignmentCard.jsx
│   │   │   ├── AdminStats.jsx
│   │   │   └── StudentSubmissionsTable.jsx
│   │   ├── assignments/        # Shared assignment modals
│   │   │   ├── AssignmentFormModal.jsx
│   │   │   └── StudentSubmissionModal.jsx
│   │   ├── common/             # Reusable UI primitives
│   │   │   ├── ConfirmationDialog.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── Toast.jsx
│   │   ├── dashboard/          # Cards & progress bars
│   │   │   ├── ProgressBar.jsx
│   │   │   └── StatCard.jsx
│   │   ├── layout/             # Master app shell
│   │   │   └── DashboardLayout.jsx
│   │   └── student/            # Student dashboard components
│   │       ├── StudentAssignmentCard.jsx
│   │       └── StudentStats.jsx
│   ├── context/
│   │   ├── AssignmentContext.jsx # Centralized assignment state & actions
│   │   └── AuthContext.jsx       # Mock user session & role management
│   ├── data/
│   │   └── seedData.js           # Default realistic assignments & users
│   ├── hooks/
│   │   └── useLocalStorage.js    # Persistent storage synchronization hook
│   ├── pages/
│   │   ├── AdminDashboard.jsx    # Professor coursework management view
│   │   ├── Login.jsx             # Authentication & demo account switcher
│   │   ├── NotFound.jsx          # Route fallback
│   │   └── StudentDashboard.jsx  # Student coursework view
│   ├── utils/
│   │   ├── dateUtils.js          # Deadlines, overdue logic, formatters
│   │   └── storage.js            # Safe localStorage JSON wrapper
│   ├── App.jsx                   # Role-based route controller
│   ├── index.css                 # Tailwind directives & base typography
│   └── main.jsx                  # React application entry point
├── index.html                    # HTML shell & font preloading
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS Tailwind plugins
├── tailwind.config.js            # Design tokens & dark mode class config
├── vercel.json                   # SPA routing fallback configuration
└── vite.config.js                # Vite build bundler configuration
```

---

## 🛠️ Technology Stack & Dependencies

* **Framework:** React 19 (`react`, `react-dom`)
* **Tooling & Bundler:** Vite 8
* **Styling:** Tailwind CSS 3.4 & PostCSS
* **Icons:** Lucide React (`lucide-react`)
* **State Management:** React Context API + Custom Hooks
* **Persistence:** HTML5 LocalStorage API
* **Deployment:** Vercel

---

## 🚀 Local Setup & Installation

### Prerequisites
* **Node.js** version 18 or higher (`node -v`)
* **npm** version 9 or higher (`npm -v`)

### 1. Clone the repository
```bash
git clone https://github.com/214G1A05C2/join-easy_task1.git
cd join-easy_task1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

### 5. Preview production build
```bash
npm run preview
```

---

## 🔄 Two-Step Submission Workflow Explanation

To ensure academic integrity while adhering to external submission guidelines:
1. **Drive Link Access:** The student clicks the provided Google Drive link on the assignment card to upload their files.
2. **Step 1 Confirmation:** The student clicks **"Submit Assignment"**. A modal asks:  
   *"Have you completed and submitted this assignment through the provided Drive link?"*  
   Options: `[Yes, I have submitted]` | `[Cancel]`.
3. **Step 2 Final Confirmation:** Upon clicking yes, the modal presents:  
   *"Are you sure you want to mark this assignment as submitted?"*  
   Options: `[Confirm Submission]` | `[Go Back]`.
4. **State Transition:** Upon final confirmation:
   * The student's status updates from `Pending` or `Overdue` to `Submitted`.
   * An ISO timestamp (`submittedAt`) is permanently saved.
   * Student and Admin analytics dynamically recalculate.
   * Changes persist immediately in `localStorage`.
   * A success toast notification is shown.

---

## ☁️ Vercel Deployment Guide

1. Ensure `vercel.json` exists in the root directory:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```
2. Build command: `npm run build`
3. Output directory: `dist`
4. Root directory: `./`
5. Connect your GitHub repository to Vercel and trigger the deployment.

---

## 📄 Submission Information

* **Candidate Name:** Pagadam Setty Yasaswini
* **Assignment Title:** Joineazy Frontend Intern – Task 1
* **GitHub Repository:** [https://github.com/214G1A05C2/join-easy_task1.git](https://github.com/214G1A05C2/join-easy_task1.git)
* **Deliverable PDF:** `PagadamSettyYasaswini-Task1.pdf`
