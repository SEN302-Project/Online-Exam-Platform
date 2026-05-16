# Online Examination Platform — Client (React Frontend)

The React + Vite + Tailwind frontend for the OEP (MERN stack). Built per the SRS for AI-proctored examinations.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (runs on http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

The Vite config proxies `/api/*` requests to `http://localhost:5000` (your Express backend).

## Project Layout

```
src/
├── components/
│   ├── common/        Navbar, Sidebar, Modal, Timer, LoadingSpinner
│   ├── exam/          QuestionCard, AnswerOptions, NavigationPanel, SubmitConfirmDialog
│   ├── proctoring/    WebcamFeed, EnvironmentCheck, ProctorAlertBanner
│   └── dashboard/     ScoreChart, ReportCard
├── pages/
│   ├── auth/          Login, Register, VerifyEmail
│   ├── student/       Dashboard, ExamRoom, Results, ExamHistory
│   ├── instructor/    Dashboard, CreateExam, QuestionBank, GradingInterface, PlagiarismReport
│   ├── proctor/       ProctorConsole, IncidentReview
│   └── admin/         AdminPanel, UserManagement, AuditLogs
├── context/           AuthContext, ExamContext
├── hooks/             useAuth, useTimer, useAutoSave, useWebcam
├── services/          api.js + per-domain services (auth, exam, proctoring, results)
├── utils/             formatTime, roleGuard
└── routes/            AppRoutes (role-based protected routes)
```

## Design System

- **Fonts:** Plus Jakarta Sans (UI), Fraunces (display headings), JetBrains Mono (timer & code)
- **Palette:** `ink` (slate neutrals) + `accent` (electric blue) + status colors
- **Components:** Tailwind utility classes + `@layer components` for `.btn-primary`, `.input`, `.card`, `.badge`

## Demo Login

Each page is currently wired to mock data. Once your backend is ready:
1. POST `/api/auth/login` should return `{ token, user: { id, name, email, role } }`
2. `role` must be one of: `student`, `instructor`, `proctor`, `institution_admin`, `system_admin`
3. Routes auto-redirect users to their role-specific dashboard after login.

## Key Features Mapped to SRS

| SRS Requirement | Implementation |
|---|---|
| FR-UM-02 Authentication | `pages/auth/Login.jsx`, `AuthContext` |
| FR-UM-03 RBAC | `utils/roleGuard.js`, `routes/AppRoutes.jsx` |
| FR-ED-01 Secure Browser | `pages/student/ExamRoom.jsx` (blur, copy-paste, contextmenu blocked) |
| FR-ED-02 Auto-save (30s) | `hooks/useAutoSave.js` |
| FR-ED-02 Countdown Timer | `hooks/useTimer.js`, `components/common/Timer.jsx` |
| FR-AP-01 System Check | `components/proctoring/EnvironmentCheck.jsx` |
| FR-AP Webcam Capture | `hooks/useWebcam.js`, `components/proctoring/WebcamFeed.jsx` |
| FR-GR-02 AI-Assisted Grading | `pages/instructor/GradingInterface.jsx` |
| FR-PD Plagiarism Reports | `pages/instructor/PlagiarismReport.jsx` |

## Next Steps

1. Build the `server/` folder (Express + MongoDB) per the structure I gave you earlier
2. Implement the API endpoints called in `src/services/*.js`
3. Add Socket.io to `services/api.js` for real-time proctoring alerts
4. Replace the mock data inside each page's component file with actual API calls