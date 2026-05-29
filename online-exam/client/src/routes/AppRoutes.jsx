import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROLE_HOMES, hasRole } from "../utils/roleGuard";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";

// Shared
import Profile from "../pages/profile";

// Student
import StudentDashboard from "../pages/student/StudentDashboard";
import ExamRoom from "../pages/student/ExamRoom";
import Results from "../pages/student/Results";
import ExamHistory from "../pages/student/ExamHistory";
import UpcomingExams from "../pages/student/UpcomingExams";
import IdentityVerification from "../pages/student/IdentityVerification";
import SystemCheck from "../pages/student/SystemCheck";
import LiveExam from "../pages/student/LiveExam";
import HonorPolicy from "../pages/student/HonorPolicy";
import HelpCenter from "../pages/student/HelpCenter";
import PracticeMode from "../pages/student/PracticeMode";
import IntegrityStatus from "../pages/student/IntegrityStatus";

// Instructor
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import CreateExam from "../pages/instructor/CreateExam";
import QuestionBank from "../pages/instructor/QuestionBank";
import GradingInterface from "../pages/instructor/GradingInterface";
import PlagiarismReport from "../pages/instructor/PlagiarismReport";
import Analytics from "../pages/instructor/Analytics";
import InstructorHelp from "../pages/instructor/InstructorHelp";
import Drafts from "../pages/instructor/Drafts";

// Proctor
import ProctorConsole from "../pages/proctor/ProctorConsole";
import IncidentReview from "../pages/proctor/IncidentReview";
import Incidents from "../pages/proctor/Incidents";
import PastSessions from "../pages/proctor/PastSessions";
import ProctorHelp from "../pages/proctor/ProctorHelp";

// Admin
import AdminPanel from "../pages/admin/AdminPanel";
import UserManagement from "../pages/admin/UserManagement";
import AuditLogs from "../pages/admin/AuditLogs";
import AdminSupport from "../pages/admin/AdminSupport";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center text-ink-400">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !hasRole(user, allowedRoles)) return <Navigate to={ROLE_HOMES[user.role] || "/login"} replace />;
  return children;
}

function AuthOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOMES[user.role] || "/login"} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/profile" element={<AuthOnly><Profile /></AuthOnly>} />

      {/* Student */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/upcoming" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><UpcomingExams /></ProtectedRoute>} />
      <Route path="/student/practice" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><PracticeMode /></ProtectedRoute>} />
      <Route path="/student/identity" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><IdentityVerification /></ProtectedRoute>} />
      <Route path="/student/system-check" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><SystemCheck /></ProtectedRoute>} />
      <Route path="/student/live" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><LiveExam /></ProtectedRoute>} />
      <Route path="/student/honor-policy" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><HonorPolicy /></ProtectedRoute>} />
      <Route path="/student/help" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><HelpCenter /></ProtectedRoute>} />
      <Route path="/student/integrity" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><IntegrityStatus /></ProtectedRoute>} />
      <Route path="/student/exam/:examId" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><ExamRoom /></ProtectedRoute>} />
      <Route path="/student/results/:resultId" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><Results /></ProtectedRoute>} />
      <Route path="/student/history" element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]}><ExamHistory /></ProtectedRoute>} />

      {/* Instructor */}
      <Route path="/instructor" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/create-exam" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><CreateExam /></ProtectedRoute>} />
      <Route path="/instructor/question-bank" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><QuestionBank /></ProtectedRoute>} />
      <Route path="/instructor/grading/:examId" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><GradingInterface /></ProtectedRoute>} />
      <Route path="/instructor/plagiarism/:examId" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><PlagiarismReport /></ProtectedRoute>} />
      <Route path="/instructor/analytics" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><Analytics /></ProtectedRoute>} />
      <Route path="/instructor/help" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><InstructorHelp /></ProtectedRoute>} />
      <Route path="/instructor/drafts" element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]}><Drafts /></ProtectedRoute>} />

      {/* Proctor */}
      <Route path="/proctor" element={<ProtectedRoute allowedRoles={[ROLES.PROCTOR]}><ProctorConsole /></ProtectedRoute>} />
      <Route path="/proctor/incidents" element={<ProtectedRoute allowedRoles={[ROLES.PROCTOR]}><Incidents /></ProtectedRoute>} />
      <Route path="/proctor/sessions" element={<ProtectedRoute allowedRoles={[ROLES.PROCTOR]}><PastSessions /></ProtectedRoute>} />
      <Route path="/proctor/help" element={<ProtectedRoute allowedRoles={[ROLES.PROCTOR]}><ProctorHelp /></ProtectedRoute>} />
      <Route path="/proctor/incident/:id" element={<ProtectedRoute allowedRoles={[ROLES.PROCTOR]}><IncidentReview /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminPanel /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/audit-logs" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AuditLogs /></ProtectedRoute>} />
      <Route path="/admin/support" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminSupport /></ProtectedRoute>} />

      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}